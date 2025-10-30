const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);

