/**
 * ==============================================================================
 * Build Controller
 * Nhiệm vụ (役割): Xử lý các HTTP Request liên quan đến thao tác lắp ráp cấu hình PC,
 * kiểm tra tương thích, tính toán công suất nguồn và lưu trữ cấu hình.
 *
 * IT用語:
 * - ビルドコントローラー (Build Controller)
 * - バリデーション呼び出し (Gọi kiểm tra tính hợp lệ dữ liệu)
 * - エラーハンドリング (Xử lý lỗi)
 * ==============================================================================
 */

const ApiResponse = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/hardware.constants');
const { validateBuildPayload } = require('../validations/build.validation');
const BuildService = require('../services/build.service');
const CompatibilityService = require('../services/compatibility.service');

/**
 * Kiểm tra tính tương thích của cấu hình đang chọn (互換性検証API)
 * Endpoint: POST /api/v1/builds/check-compatibility
 */
async function checkCompatibility(req, res, next) {
  try {
    const { components } = req.body;
    // Gợi ý logic (TODO):
    // 1. TODO: Kiểm tra mảng components có hợp lệ không.
    // 2. TODO: Gọi CompatibilityService.evaluateFullBuild(components).
    // 3. TODO: Gọi CompatibilityService.calculateWattageAndCheckPsu(components).
    // 4. TODO: Trả về kết quả đánh giá (isCompatible, issues, warnings, wattage).

    return ApiResponse.success(res, HTTP_STATUS.OK, 'TODO: Triển khai checkCompatibility');
  } catch (error) {
    next(error);
  }
}

/**
 * Lưu cấu hình PC vào cơ sở dữ liệu (構成保存API)
 * Endpoint: POST /api/v1/builds
 */
async function saveBuild(req, res, next) {
  try {
    // 1. Validate payload đầu vào
    const validation = validateBuildPayload(req.body);
    if (!validation.isValid) {
      return ApiResponse.error(res, HTTP_STATUS.BAD_REQUEST, 'Dữ liệu không hợp lệ', validation.errors);
    }

    // Gợi ý logic (TODO):
    // 2. TODO: Gọi BuildService.createBuild(req.body) để lưu vào PostgreSQL.
    // 3. TODO: Trả về HTTP 201 Created cùng ID cấu hình vừa tạo.

    return ApiResponse.success(res, HTTP_STATUS.CREATED, 'TODO: Triển khai saveBuild');
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy chi tiết một cấu hình đã lưu (保存済み構成取得API)
 * Endpoint: GET /api/v1/builds/:id
 */
async function getBuild(req, res, next) {
  try {
    const { id } = req.params;
    // Gợi ý logic (TODO):
    // 1. TODO: Gọi BuildService.getBuildById(id).
    // 2. TODO: Trả về dữ liệu cấu hình hoặc 404 nếu không tìm thấy.

    return ApiResponse.success(res, HTTP_STATUS.OK, `TODO: Triển khai getBuild cho ID ${id}`);
  } catch (error) {
    next(error);
  }
}

/**
 * Gợi ý cấu hình tự động theo khảo sát ngân sách & nhu cầu (構成自動推薦API)
 * Endpoint: POST /api/v1/builds/recommend
 */
async function recommendBuild(req, res, next) {
  try {
    const { budget, purpose, cpu_brand } = req.body;
    // Gợi ý logic (TODO):
    // 1. TODO: Gọi BuildService.recommendBuild({ budget, purpose, cpu_brand }).
    // 2. TODO: Trả về danh sách linh kiện được tối ưu.

    return ApiResponse.success(res, HTTP_STATUS.OK, 'TODO: Triển khai recommendBuild');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkCompatibility,
  saveBuild,
  getBuild,
  recommendBuild,
};
