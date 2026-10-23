/**
 * ==============================================================================
 * API Response Utility
 * Nhiệm vụ (役割): Chuẩn hóa cấu trúc phản hồi JSON trả về cho Client.
 * Giúp Frontend dễ dàng parse dữ liệu đồng nhất.
 * IT用語: レスポンスフォーマットの共通化 (Chuẩn hóa định dạng phản hồi)
 * ==============================================================================
 */

class ApiResponse {
  /**
   * Phản hồi thành công (成功レスポンス)
   * @param {Object} res - Express Response Object
   * @param {number} statusCode - HTTP Status code (mặc định 200)
   * @param {string} message - Thông điệp thân thiện
   * @param {any} data - Dữ liệu payload
   */
  static success(res, statusCode = 200, message = 'Success', data = null) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Phản hồi thất bại / Lỗi nghiệp vụ (エラーレスポンス)
   * @param {Object} res - Express Response Object
   * @param {number} statusCode - HTTP Status code (4xx hoặc 5xx)
   * @param {string} message - Thông báo lỗi
   * @param {any} errors - Chi tiết mảng lỗi (validation errors, v.v.)
   */
  static error(res, statusCode = 500, message = 'Internal Server Error', errors = null) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}

module.exports = ApiResponse;
