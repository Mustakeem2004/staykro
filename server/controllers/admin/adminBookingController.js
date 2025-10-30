const Booking = require("../../models/Booking");
const Hotel = require("../../models/Hotel");
const User = require("../../models/User");

// Get all bookings for hotels owned by admin
const getAllBookings = async (req, res) => {
  try {
    // Find hotels added by this admin
    const hotels = await Hotel.find({ addedBy: req.admin._id });
    const hotelIds = hotels.map(h => h._id);

    const bookings = await Booking.find({ hotelId: { $in: hotelIds } })
      .populate("userId", "name email")
      .populate("hotelId", "name city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get booking by ID (only if belongs to admin's hotel)
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("hotelId");

    if (!booking || booking.hotelId.addedBy.toString() !== req.admin._id.toString()) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    await booking.populate("userId", "name email").execPopulate();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id).populate("hotelId");

    if (!booking || booking.hotelId.addedBy.toString() !== req.admin._id.toString()) {
      return res.status(404).json({ success: false, message: "Booking not found or unauthorized" });
    }

    booking.status = status || booking.status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete booking (optional for admin)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("hotelId");

    if (!booking || booking.hotelId.addedBy.toString() !== req.admin._id.toString()) {
      return res.status(404).json({ success: false, message: "Booking not found or unauthorized" });
    }

    await booking.deleteOne();
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
