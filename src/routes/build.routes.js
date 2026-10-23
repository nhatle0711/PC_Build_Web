/**
 * ==============================================================================
 * Build Routes
 * Khai báo các endpoint URL cho tài nguyên cấu hình máy tính (/api/v1/builds)
 * IT用語: ルーティング (Routing), RESTful API
 * ==============================================================================
 */

const express = require('express');
const router = express.Router();
const buildController = require('../controllers/build.controller');

// POST /api/v1/builds/check-compatibility - Kiểm tra xung đột phần cứng
router.post('/check-compatibility', buildController.checkCompatibility);

// POST /api/v1/builds/recommend - Gợi ý cấu hình theo khảo sát ngân sách/nhu cầu
router.post('/recommend', buildController.recommendBuild);

// POST /api/v1/builds - Lưu cấu hình mới
router.post('/', buildController.saveBuild);

// GET /api/v1/builds/:id - Lấy thông tin cấu hình đã lưu
router.get('/:id', buildController.getBuild);

module.exports = router;
