/**
 * ==============================================================================
 * Integration Tests: Build & Compatibility API Endpoints
 * Nhiệm vụ (役割): Kiểm thử tích hợp toàn diện từ tầng Route -> Middleware -> Controller -> Service
 * thông qua HTTP Server giả lập bằng Supertest.
 *
 * IT用語:
 * - 結合テスト (Integration Test)
 * - エンドツーエンド検証 (E2E Verification)
 * - モック (Mocking)
 * ==============================================================================
 */

const request = require('supertest');
const app = require('../../src/app');

describe('PC Build & Compatibility API - Integration Tests (結合テストスイート)', () => {
  describe('GET /api/v1/health', () => {
    test('Nên trả về HTTP 200 và trạng thái hệ thống hoạt động bình thường', async () => {
      const response = await request(app).get('/api/v1/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });
  });

  describe('POST /api/v1/builds/check-compatibility', () => {
    test('TODO: Kiểm thử gửi payload cấu hình linh kiện và nhận về kết quả tương thích', async () => {
      // Gợi ý:
      // const payload = { components: [...] };
      // const res = await request(app).post('/api/v1/builds/check-compatibility').send(payload);
      // expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /api/v1/builds (Validation Error Handling)', () => {
    test('Nên trả về HTTP 400 Bad Request khi gửi payload thiếu tên cấu hình (build_name)', async () => {
      const invalidPayload = {
        build_name: '', // Rỗng
        items: [],
      };

      const res = await request(app).post('/api/v1/builds').send(invalidPayload);
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
  });
});
