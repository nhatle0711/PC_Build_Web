/**
 * ==============================================================================
 * Centralized Error Handling Middleware
 * Nhiệm vụ (役割): Bộ lọc trung gian bắt mọi lỗi phát sinh trong ứng dụng (Đồng bộ & Bất đồng bộ),
 * ghi log lỗi và định dạng phản hồi chuẩn cho client.
 *
 * IT用語:
 * - 共通エラーハンドラー (Centralized Error Handler)
 * - スタックトレース (Stack Trace)
 * - 障害対応 (Sự cố và xử lý sự cố)
 * ==============================================================================
 */

const ApiResponse = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/hardware.constants');

function errorHandler(err, req, res, _next) {
  // Ghi log chi tiết cho kỹ sư debug (Chỉ hiện stack trace ở môi trường development)
  const isDev = process.env.NODE_ENV !== 'production';

  console.error('[Error Middleware] Đã bắt được ngoại lệ:', {
    message: err.message,
    path: req.originalUrl,
    method: req.method,
    stack: isDev ? err.stack : undefined,
  });

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Đã xảy ra lỗi máy chủ nội bộ. Vui lòng thử lại sau.';

  return ApiResponse.error(res, statusCode, message, isDev ? { stack: err.stack } : null);
}

module.exports = errorHandler;
