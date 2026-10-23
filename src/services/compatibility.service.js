/**
 * ==============================================================================
 * Compatibility Service (Compatibility Engine)
 * Nhiệm vụ (役割): Trái tim nghiệp vụ của hệ thống - Chịu trách nhiệm thực thi
 * thuật toán kiểm tra tính tương thích chéo giữa các thành phần phần cứng máy tính.
 *
 * IT用語:
 * - 互換性チェック (Kiểm tra tương thích - Compatibility Check)
 * - 競合検知 (Phát hiện xung đột - Conflict Detection)
 * - 消費電力計算 (Tính toán lượng điện tiêu thụ - Power Consumption Calculation)
 * - 業務ロジック (Business Logic)
 * ==============================================================================
 */

const { COMPATIBILITY_STATUS } = require('../constants/hardware.constants');

class CompatibilityService {
  /**
   * Kiểm tra tính tương thích giữa CPU và Bo mạch chủ (Motherboard)
   * Tiêu chí: Socket của CPU phải trùng khớp hoàn toàn với Socket của Motherboard.
   * Ví dụ: CPU LGA1700 chỉ cắm được trên Mainboard socket LGA1700.
   *
   * @param {Object} cpu - Thông tin linh kiện CPU (bao gồm specs.socket)
   * @param {Object} motherboard - Thông tin linh kiện Motherboard (bao gồm specs.socket)
   * @returns {{ isCompatible: boolean, message: string }}
   */
  static checkCpuMotherboardSocket(cpu, motherboard) {
    // Boilerplate cơ bản - Hãy tự tay triển khai thuật toán chi tiết!
    // Gợi ý logic (TODO):
    // 1. TODO: Kiểm tra cpu.specs?.socket và motherboard.specs?.socket có tồn tại không.
    // 2. TODO: So sánh so khớp chuỗi chuẩn hóa (trim, uppercase).
    // 3. TODO: Trả về kết quả { isCompatible: boolean, message: string }.

    throw new Error('TODO: Hãy tự triển khai hàm checkCpuMotherboardSocket theo tư duy của bạn!');
  }

  /**
   * Kiểm tra tính tương thích giữa RAM và Bo mạch chủ (Motherboard)
   * Tiêu chí:
   * 1. Chuẩn RAM (DDR4 vs DDR5) phải khớp với chuẩn khe cắm trên Motherboard.
   * 2. Tổng số thanh RAM không được vượt quá số khe RAM vật lý (ram_slots).
   *
   * @param {Array<Object>} ramModules - Danh sách thanh RAM
   * @param {Object} motherboard - Thông tin Motherboard
   * @returns {{ isCompatible: boolean, message: string }}
   */
  static checkRamMotherboardCompatibility(ramModules, motherboard) {
    // Boilerplate cơ bản
    // Gợi ý logic (TODO):
    // 1. TODO: Lấy chuẩn RAM từ ramModules (vd: ram.specs?.ram_type: "DDR5").
    // 2. TODO: Lấy chuẩn RAM hỗ trợ từ motherboard (vd: motherboard.specs?.ram_type: "DDR5").
    // 3. TODO: Kiểm tra tổng số thanh RAM cắm vào có vượt quá motherboard.specs?.ram_slots không.

    throw new Error('TODO: Hãy tự triển khai hàm checkRamMotherboardCompatibility!');
  }

  /**
   * Tính toán tổng công suất tiêu thụ điện (Total Wattage) và đánh giá Nguồn (PSU)
   * Tiêu chí:
   * - Tổng TDP = CPU TDP + GPU TDP + Công suất các linh kiện phụ (khoảng 50W - 100W cho Main, RAM, Fan, SSD).
   * - Nguồn đề xuất = Tổng TDP * 1.25 (hệ số dự phòng an toàn 25% - ヘッドルーム Headroom).
   * - Nếu người dùng đã chọn PSU, kiểm tra xem công suất PSU có >= mức tối thiểu an toàn hay không.
   *
   * @param {Array<Object>} components - Toàn bộ linh kiện đã chọn trong build
   * @param {Object|null} selectedPsu - Nguồn máy tính đã chọn (nếu có)
   * @returns {{ estimatedWattage: number, recommendedPsuWattage: number, psuSufficient: boolean, notes: Array<string> }}
   */
  static calculateWattageAndCheckPsu(components, selectedPsu = null) {
    // Boilerplate cơ bản
    // Gợi ý logic (TODO):
    // 1. TODO: Duyệt mảng components và tính tổng tdp_wattage.
    // 2. TODO: Cộng thêm khoảng bù tải tiêu thụ nền của hệ thống (Motherboard, quạt, LED, SSD).
    // 3. TODO: Tính công suất PSU khuyến nghị (nhân hệ số an toàn 1.25 - 1.3).
    // 4. TODO: Nếu selectedPsu tồn tại, so sánh selectedPsu.specs?.wattage với mức yêu cầu.

    throw new Error('TODO: Hãy tự triển khai hàm calculateWattageAndCheckPsu!');
  }

  /**
   * Kiểm tra tổng thể toàn bộ cấu hình PC Build (Toàn diện đa chiều)
   *
   * @param {Array<Object>} components - Danh sách linh kiện đã được hydrate đầy đủ dữ liệu
   * @returns {{ status: string, issues: Array<string>, warnings: Array<string> }}
   */
  static evaluateFullBuild(components) {
    // Boilerplate cơ bản
    // Gợi ý logic (TODO):
    // 1. TODO: Tách các linh kiện theo category (CPU, Motherboard, RAM, GPU, PSU, Case, Cooler).
    // 2. TODO: Gọi lần lượt các hàm kiểm tra đơn vị: Socket, RAM type, PSU Wattage, Kích thước GPU vs Case length.
    // 3. TODO: Tổng hợp mảng lỗi (issues) và cảnh báo (warnings) để trả về trạng thái tổng quát.

    throw new Error('TODO: Hãy tự triển khai hàm evaluateFullBuild!');
  }
}

module.exports = CompatibilityService;
