const Booking = require("../models/Booking");

// ➕ Create booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, hotelId, checkInDate, checkOutDate, guests, price } = req.body;

    const booking = await Booking.create({
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      guests,
      price,
    });

    const updatedBookings = await Booking.find({ userId }).populate("hotelId");
    res.json(updatedBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📦 Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("hotelId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
