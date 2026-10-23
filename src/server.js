/**
 * ==============================================================================
 * Server Entry Point
 * Nhiệm vụ (役割): Khởi động HTTP Server, thiết lập kết nối đến Cơ sở dữ liệu
 * PostgreSQL và Redis, lắng nghe PORT và quản lý Graceful Shutdown.
 *
 * IT用語:
 * - サーバー起動 (Khởi động máy chủ)
 * - ポート監視 (Lắng nghe cổng / Listen PORT)
 * - グレースフルシャットダウン (Graceful Shutdown)
 * ==============================================================================
 */

require('dotenv').config();
const http = require('http');
const app = require('./app');
const { pool } = require('./config/db');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  try {
    // 1. Kiểm tra kết nối sơ bộ tới Database (PostgreSQL)
    // IT用語: ヘルスチェック (Health Check)
    console.log('[Server] Đang kiểm tra kết nối PostgreSQL...');
    await pool.query('SELECT 1 AS health_check');
    console.log('[Server] Kết nối cơ sở dữ liệu PostgreSQL đã sẵn sàng.');

    // 2. Thử kết nối tới Redis (không bắt buộc chặn hoàn toàn nếu Redis chưa bật)
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
    } catch (redisErr) {
      console.warn('[Server] Redis không sẵn sàng, hệ thống sẽ chạy mà không có cache tầng 2.');
    }

    // 3. Lắng nghe yêu cầu trên PORT được chỉ định
    server.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 PC Builder Server đang chạy tại: http://localhost:${PORT}`);
      console.log(`📡 Môi trường: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📄 Giao diện Web: http://localhost:${PORT}/index.html`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('[Server] Khởi động máy chủ thất bại:', err);
    process.exit(1);
  }
}

// Xử lý tắt máy chủ an toàn (Graceful Shutdown)
function handleShutdown(signal) {
  console.log(`[Server] Nhận tín hiệu ${signal}. Đang đóng các kết nối...`);
  server.close(async () => {
    try {
      await pool.end();
      if (redisClient.isOpen) {
        await redisClient.quit();
      }
      console.log('[Server] Đã giải phóng toàn bộ tài nguyên. Tạm biệt!');
      process.exit(0);
    } catch (e) {
      console.error('[Server] Lỗi trong quá trình giải phóng tài nguyên:', e);
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer();
