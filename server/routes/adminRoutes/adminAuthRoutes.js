const express = require("express");
const router = express.Router();
const adminAuthController = require("../../controllers/admin/adminAuthController");
// const { protectAdmin } = require("../../middleware/adminMiddleware");

// Admin signup
router.post("/signup", adminAuthController.signup);

// Admin login
router.post("/login", adminAuthController.login);

// Get current admin
router.get("/me",  adminAuthController.getMe);

// Admin logout
router.post("/logout", adminAuthController.logout);

module.exports = router;
