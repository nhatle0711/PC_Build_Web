/**
 * ==============================================================================
 * Hardware Constants & Enumerations
 * Định nghĩa các hằng số phần cứng máy tính và mã lỗi hệ thống
 * IT用語: 定数定義 (Định nghĩa hằng số), 列挙型 (Enum)
 * ==============================================================================
 */

// Danh mục loại linh kiện phần cứng (パーツ種別)
const COMPONENT_TYPES = Object.freeze({
  CPU: 'CPU',
  MOTHERBOARD: 'MOTHERBOARD',
  RAM: 'RAM',
  GPU: 'GPU',
  PSU: 'PSU',
  STORAGE: 'STORAGE',
  CASE: 'CASE',
  COOLER: 'COOLER',
});

// Các chuẩn Socket CPU phổ biến (CPUソケット規格)
const CPU_SOCKETS = Object.freeze({
  LGA1700: 'LGA1700',
  LGA1851: 'LGA1851',
  AM4: 'AM4',
  AM5: 'AM5',
});

// Các chuẩn bộ nhớ RAM (RAM規格)
const RAM_TYPES = Object.freeze({
  DDR4: 'DDR4',
  DDR5: 'DDR5',
});

// Kích thước chuẩn Bo mạch chủ và Vỏ case (フォームファクタ - Form Factor)
const FORM_FACTORS = Object.freeze({
  E_ATX: 'E-ATX',
  ATX: 'ATX',
  MICRO_ATX: 'Micro-ATX',
  MINI_ITX: 'Mini-ITX',
});

// Mã kết quả kiểm tra tương thích (互換性判定コード)
const COMPATIBILITY_STATUS = Object.freeze({
  COMPATIBLE: 'COMPATIBLE',         // Tương thích hoàn toàn (互換性あり)
  INCOMPATIBLE: 'INCOMPATIBLE',     // Xung đột phần cứng (互換性なし / 競合)
  WARNING: 'WARNING',               // Cảnh báo kích thước hoặc công suất sát giới hạn (警告)
});

// HTTP Status Codes chuẩn (HTTPステータスコード)
const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
});

module.exports = {
  COMPONENT_TYPES,
  CPU_SOCKETS,
  RAM_TYPES,
  FORM_FACTORS,
  COMPATIBILITY_STATUS,
  HTTP_STATUS,
};
