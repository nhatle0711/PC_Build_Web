/**
 * ==============================================================================
 * Build Input Validation
 * Nhiệm vụ (役割): Kiểm tra tính hợp lệ của dữ liệu đầu vào (Input Validation)
 * trước khi chuyển tiếp vào tầng Controller và Service xử lý.
 * IT用語: バリデーション (Validation), 入力チェック (Kiểm tra dữ liệu đầu vào)
 * ==============================================================================
 */

/**
 * Validate cấu trúc payload tạo mới hoặc cập nhật một PC Build
 * @param {Object} reqBody - Request body từ client
 * @returns {{ isValid: boolean, errors: Array<string> }}
 */
function validateBuildPayload(reqBody) {
  const errors = [];

  // TODO 1: Kiểm tra tên cấu hình (build_name) không được để trống, độ dài từ 3 - 200 ký tự.
  if (!reqBody || !reqBody.build_name || typeof reqBody.build_name !== 'string' || reqBody.build_name.trim().length === 0) {
    errors.push('Tên cấu hình máy (build_name) là bắt buộc và phải là chuỗi hợp lệ.');
  }

  // TODO 2: Kiểm tra danh sách linh kiện (components / items):
  // - Phải là một mảng (Array).
  // - Mỗi phần tử phải có component_id hợp lệ (số nguyên dương) và slot_type hợp lệ.
  if (!reqBody || !Array.isArray(reqBody.items)) {
    errors.push('Danh sách linh kiện (items) phải là một mảng danh sách hợp lệ.');
  }

  /**
   * Gợi ý các bước tự triển khai tiếp theo (TODO):
   * 1. TODO: Kiểm tra số lượng (quantity) của từng linh kiện (vd: RAM có thể tối đa 4 thanh, CPU chỉ được 1).
   * 2. TODO: Bạn có thể nâng cấp sử dụng thư viện chuyên dụng như Joi hoặc Zod nếu muốn validate schema chặt chẽ hơn.
   */

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateBuildPayload,
};
