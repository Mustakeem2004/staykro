const express = require("express");
const { getAdminDashboard } = require("../../controllers/admin/adminDashboardController");
const adminAuth = require("../../middleware/adminMiddleware");

const router = express.Router();

// GET /api/admin/dashboard
router.get("/", adminAuth, getAdminDashboard);

module.exports = router;
