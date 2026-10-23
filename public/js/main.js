/**
 * ==============================================================================
 * Client-side Main Script: PC Part Builder & Compatibility Checker
 * Nhiệm vụ (役割): Xử lý tương tác giao diện người dùng, đồng bộ thanh đo nguồn,
 * gọi API backend để kiểm tra tương thích và lưu cấu hình máy.
 * ==============================================================================
 */

// IT用語: イベントリスナー (Event Listener), 非同期通信 (Ajax / Fetch API)

document.addEventListener('DOMContentLoaded', () => {
  initBudgetRangeSync();
  initFormInteractions();
});

/**
 * Đồng bộ giá trị hiển thị của thanh trượt ngân sách ở trang chủ
 */
function initBudgetRangeSync() {
  const budgetRange = document.getElementById('budget-range');
  const budgetOutput = document.getElementById('budget-output');

  if (budgetRange && budgetOutput) {
    budgetRange.addEventListener('input', (event) => {
      const val = Number(event.target.value);
      budgetOutput.textContent = new Intl.NumberFormat('vi-VN').format(val);
    });
  }
}

/**
 * Khởi tạo các event listeners cơ bản cho form và nút thao tác
 */
function initFormInteractions() {
  // Survey form submit
  const surveyForm = document.getElementById('pc-survey-form');
  if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
      // TODO: Gửi yêu cầu gợi ý cấu hình tới /api/v1/builds/recommend
      console.log('[Client] Survey form submitted. Ready to connect API.');
    });
  }

  // Builder actions
  const btnClearBuild = document.getElementById('btn-clear-build');
  if (btnClearBuild) {
    btnClearBuild.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn xóa cấu hình đang lắp ráp?')) {
        // TODO: Xóa state cấu hình hiện tại trong localStorage hoặc Memory
        console.log('[Client] Cleared build workspace.');
      }
    });
  }
}
