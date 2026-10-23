/**
 * ==============================================================================
 * Component Controller
 * Nhiệm vụ (役割): Xử lý các HTTP Request liên quan đến kho linh kiện phần cứng,
 * lọc linh kiện theo tiêu chí (category, brand, socket, giá) và phân trang.
 *
 * IT用語:
 * - コントローラー (Controller)
 * - リクエスト処理 (Xử lý request)
 * - クエリパラメータ (Query Parameters)
 * ==============================================================================
 */

const ApiResponse = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/hardware.constants');
const { query } = require('../config/db');

/**
 * Lấy danh sách linh kiện kèm lọc và phân trang (一覧取得・フィルタリング)
 * Endpoint: GET /api/v1/components
 */
async function getComponents(req, res, next) {
  try {
    // Boilerplate cơ bản
    // Gợi ý logic (TODO):
    // 1. TODO: Đọc req.query (category, brand, min_price, max_price, page, limit).
    // 2. TODO: Xây dựng câu truy vấn SQL động an toàn (Parameterized Query) để chống SQL Injection (SQLインジェクション対策).
    // 3. TODO: Tích hợp kiểm tra cache Redis trước khi truy vấn PostgreSQL.
    // 4. TODO: Trả về kết quả bằng ApiResponse.success(res, HTTP_STATUS.OK, 'Lấy danh sách thành công', data).

    return ApiResponse.success(res, HTTP_STATUS.OK, 'TODO: Hãy tự viết logic truy vấn danh sách linh kiện trong getComponents', []);
  } catch (error) {
    next(error); // Chuyển lỗi tới Error Middleware (例外ハンドラーへ移譲)
  }
}

/**
 * Lấy chi tiết một linh kiện theo ID (詳細取得)
 * Endpoint: GET /api/v1/components/:id
 */
async function getComponentById(req, res, next) {
  try {
    const { id } = req.params;
    // Gợi ý logic (TODO):
    // 1. TODO: Query SELECT * FROM components WHERE id = $1
    // 2. TODO: Nếu không tìm thấy, trả về 404 Not Found
    // 3. TODO: Nếu tìm thấy, trả về thông tin chi tiết qua ApiResponse.success()

    return ApiResponse.success(res, HTTP_STATUS.OK, `TODO: Triển khai getComponentById với id: ${id}`, null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getComponents,
  getComponentById,
};
