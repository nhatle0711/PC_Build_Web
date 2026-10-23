/**
 * ==============================================================================
 * Redis Cache Configuration
 * Nhiệm vụ (役割): Khởi tạo Redis Client để lưu trữ cache các truy vấn danh mục linh kiện,
 * giảm tải truy vấn lặp lại đến PostgreSQL.
 * IT用語: キャッシュ層 (Tầng Cache), インメモリデータベース (In-memory DB)
 * ==============================================================================
 */

const { createClient } = require('redis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        console.warn('[Redis] Vượt quá số lần thử kết nối lại. Bỏ qua cache tạm thời.');
        return new Error('Redis connection retry limit reached');
      }
      return Math.min(retries * 500, 3000);
    },
  },
});

redisClient.on('error', (err) => {
  // IT用語: 例外処理 (Bắt lỗi kết nối Redis để không làm sập server chính)
  console.warn('[Redis] Cảnh báo lỗi Redis:', err.message);
});

redisClient.on('connect', () => {
  console.log('[Redis] Đã kết nối thành công tới Redis (Redis接続完了)');
});

/**
 * Gợi ý các bước tự triển khai tiếp theo (TODO):
 * 1. TODO: Tạo helper setCache(key, data, ttlSeconds) và getCache(key) để tái sử dụng trong controller/service.
 * 2. TODO: Viết cơ chế vô hiệu hóa cache (Cache Invalidation - キャッシュの無効化) khi có linh kiện mới được thêm vào DB.
 * 3. TODO: Tích hợp redisClient.connect() trong server.js với graceful fallback nếu Redis không hoạt động.
 */

module.exports = redisClient;
