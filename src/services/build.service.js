/**
 * ==============================================================================
 * Build Service
 * Nhiệm vụ (役割): Xử lý nghiệp vụ tạo, lưu trữ, cập nhật, truy xuất các cấu hình PC
 * và tương tác với tầng Data Access (PostgreSQL & Redis).
 *
 * IT用語:
 * - トランザクション管理 (Quản lý Transaction)
 * - 永続化 (Persistence / Lưu trữ bền vững vào DB)
 * - 参照整合性 (Toàn vẹn tham chiếu)
 * ==============================================================================
 */

const { query, pool } = require('../config/db');

class BuildService {
  /**
   * Tạo mới một cấu hình PC (Bao gồm bảng builds và build_items)
   * @param {Object} buildData - Dữ liệu cấu hình { build_name, user_identifier, items }
   * @returns {Promise<Object>} Build đã được tạo
   */
  static async createBuild(buildData) {
    // Boilerplate cơ bản - Gợi ý sử dụng Transaction
    // Gợi ý logic (TODO):
    // 1. TODO: Lấy client từ pool (const client = await pool.connect()).
    // 2. TODO: client.query('BEGIN') để bắt đầu transaction.
    // 3. TODO: Insert thông tin chung vào bảng `builds`.
    // 4. TODO: Loop qua `items` và insert vào bảng `build_items`.
    // 5. TODO: client.query('COMMIT') và trả về kết quả.
    // 6. TODO: Trong khối catch, gọi client.query('ROLLBACK') và throw error.

    throw new Error('TODO: Hãy tự triển khai hàm createBuild với Database Transaction!');
  }

  /**
   * Lấy chi tiết cấu hình PC theo ID (kèm danh sách linh kiện)
   * @param {number|string} buildId
   * @returns {Promise<Object|null>}
   */
  static async getBuildById(buildId) {
    // Boilerplate cơ bản
    // Gợi ý logic (TODO):
    // 1. TODO: Query bảng `builds` theo id.
    // 2. TODO: Query bảng `build_items` JOIN với `components` để lấy chi tiết từng linh kiện.
    // 3. TODO: Ghép dữ liệu và trả về object hoàn chỉnh.

    throw new Error('TODO: Hãy tự triển khai hàm getBuildById!');
  }

  /**
   * Gợi ý cấu hình tự động dựa trên ngân sách và nhu cầu
   * @param {Object} criteria - { budget: number, purpose: string, cpu_brand: string }
   * @returns {Promise<Object>}
   */
  static async recommendBuild(criteria) {
    // Boilerplate cơ bản
    // Gợi ý logic (TODO):
    // 1. TODO: Phân bổ tỷ lệ ngân sách cho từng linh kiện theo mục đích (ví dụ: Gaming thì GPU chiếm 40-50% ngân sách).
    // 2. TODO: Truy vấn linh kiện tối ưu trong khoảng giá từng phần.
    // 3. TODO: Chạy qua CompatibilityService để đảm bảo các linh kiện gợi ý tương thích 100%.

    throw new Error('TODO: Hãy tự triển khai thuật toán gợi ý cấu hình recommendBuild!');
  }
}

module.exports = BuildService;
