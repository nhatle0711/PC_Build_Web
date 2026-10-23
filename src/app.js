/**
 * ==============================================================================
 * Express Application Configuration
 * Nhiệm vụ (役割): Khởi tạo instance Express, đăng ký các global middleware bảo mật,
 * CORS, parse body, phục vụ static files từ thư mục public/ và đăng ký routes.
 *
 * IT用語:
 * - ミドルウェア設定 (Cấu hình Middleware)
 * - セキュリティヘッダー (Security Headers / Helmet)
 * - 静的ファイル配信 (Phục vụ file tĩnh)
 * ==============================================================================
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const apiV1Router = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// 1. Cấu hình bảo mật & Logging (セキュリティ対策とログ出力)
app.use(helmet({
  contentSecurityPolicy: false, // Tắt tạm thời để nạp tài nguyên cục bộ dễ dàng trong môi trường dev
}));
app.use(cors());
app.use(morgan('dev'));

// 2. Parse dữ liệu Request Body (JSON & URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Phục vụ thư mục Frontend tĩnh (public/)
app.use(express.static(path.join(__dirname, '../public')));

// 4. Gắn các API endpoints với prefix /api/v1
app.use('/api/v1', apiV1Router);

// 5. Xử lý đường dẫn 404 cho API không tồn tại
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Không tìm thấy endpoint API: ${req.method} ${req.originalUrl}`,
  });
});

// 6. Global Error Handling Middleware (Bắt buộc đặt cuối cùng sau toàn bộ routes)
app.use(errorHandler);

module.exports = app;
