const mongoose = require("mongoose");


const roomSchema = new mongoose.Schema({
  roomType: { type: String},
  pricePerNight: { type: Number },
  BasicGuestQuantity: { type: Number },
  DoubleBed: { type: Number, default:  1},
  SingleBed: { type: Number, default: 1 },
  ExtraGuestPricePerNight: { type: Number },
  maxGuests: { type: Number },
  roomAmenities: [String],
  availableRooms: { type: Number, default: 0 },
  roomImages : { type: [String] },
});

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    description: String,
    starRating: { type: Number},
    thumbnail: { type: String, required: true },       // main photo
    images: { type: [String], required: true },
    mapEmbedUrl: String,
    amenities: [String],
    basePricePerNight: Number,
    policies: {
      checkInTime: String,
      checkOutTime: String,
      cancellationPolicy: String,
      ageRestriction: String,
    },
    rooms: [roomSchema],
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
