/**
 * ==============================================================================
 * Central API Router (v1)
 * Gom và gắn tiền tố (prefix) cho toàn bộ API phiên bản 1 (/api/v1)
 * IT用語: ルーター統合 (Tích hợp bộ định tuyến)
 * ==============================================================================
 */

const express = require('express');
const router = express.Router();

const componentRoutes = require('./component.routes');
const buildRoutes = require('./build.routes');

// Gắn nhánh endpoint
router.use('/components', componentRoutes);
router.use('/builds', buildRoutes);

// Health check endpoint (ヘルスチェック)
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

module.exports = router;
