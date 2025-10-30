const express = require("express");
const {
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../../controllers/admin/adminBookingController");
const adminAuth = require("../../middleware/adminMiddleware");

const router = express.Router();

// Protect all admin routes
router.use(adminAuth);

// GET all bookings for admin's hotels
router.get("/", getAllBookings);

// GET single booking by ID
router.get("/:id", getBookingById);

// UPDATE booking status
router.put("/:id/status", updateBookingStatus);

// DELETE a booking
router.delete("/:id", deleteBooking);

module.exports = router;
