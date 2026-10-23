/**
 * ==============================================================================
 * Component Routes
 * Khai báo các endpoint URL cho tài nguyên linh kiện phần cứng (/api/v1/components)
 * IT用語: ルーティング (Routing), エンドポイント (Endpoint)
 * ==============================================================================
 */

const express = require('express');
const router = express.Router();
const componentController = require('../controllers/component.controller');

// GET /api/v1/components - Lấy danh sách linh kiện (có lọc & phân trang)
router.get('/', componentController.getComponents);

// GET /api/v1/components/:id - Lấy chi tiết một linh kiện cụ thể
router.get('/:id', componentController.getComponentById);

module.exports = router;
