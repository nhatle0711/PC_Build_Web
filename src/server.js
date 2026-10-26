// src/server.js
const app = require('./app');
const db = require('./config/db'); // hoặc đường dẫn kết nối pool của bạn

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('[Server] Đang kiểm tra kết nối PostgreSQL...');
    // Thử kết nối nếu có DB
    if (db && typeof db.query === 'function') {
      await db.query('SELECT 1');
      console.log('✅ [Database] Kết nối PostgreSQL thành công!');
    }
  } catch (dbError) {
    console.warn('⚠️ [Database] Chưa bật PostgreSQL (Milestone 1 chạy chế độ Static UI):', dbError.message);
  }

  // Luôn luôn lắng nghe PORT để phục vụ giao diện
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`📄 Trang chủ:       http://localhost:${PORT}/index.html`);
    console.log(`🛒 Kho linh kiện:   http://localhost:${PORT}/catalog.html`);
    console.log(`🛠️ Bàn lắp ráp PC:  http://localhost:${PORT}/builder.html`);
    console.log(`💾 Cấu hình đã lưu: http://localhost:${PORT}/saved.html`);
    console.log(`=================================================`);
  });
}

startServer();