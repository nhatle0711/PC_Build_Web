/**
 * ==============================================================================
 * Database Configuration (PostgreSQL Pool)
 * Nhiệm vụ (役割): Khởi tạo và quản lý Connection Pool kết nối đến PostgreSQL.
 * Đảm bảo quản lý tài nguyên kết nối an toàn, hiệu quả.
 * IT用語: コネクションプール (Connection Pool), データベース接続 (Kết nối DB)
 * ==============================================================================
 */

const { Pool } = require('pg');
require('dotenv').config();

// Khởi tạo Pool kết nối dựa trên biến môi trường (環境変数)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'pc_builder_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20, // Số kết nối tối đa trong pool (最大接続数)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Lắng nghe sự kiện kết nối thành công / lỗi
pool.on('connect', () => {
  // IT用語: ログ出力 (Ghi log kết nối)
  console.log('[DB] Kết nối PostgreSQL thành công (PostgreSQL接続確立)');
});

pool.on('error', (err) => {
  // IT用語: 例外処理 (Xử lý lỗi bất ngờ của client nhàn rỗi)
  console.error('[DB] Lỗi kết nối bất ngờ từ PostgreSQL Pool:', err);
});

/**
 * Gợi ý các bước tự triển khai tiếp theo (TODO):
 * 1. TODO: Viết hàm helper testConnection() để kiểm tra kết nối ngay khi khởi động server.
 * 2. TODO: Sử dụng transaction helper (BEGIN, COMMIT, ROLLBACK) cho các tác vụ lưu Build phức tạp.
 * 3. TODO: Đảm bảo luôn giải phóng client (client.release()) khi mượn kết nối từ pool.
 */

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
