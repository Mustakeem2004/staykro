const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
});

module.exports = mongoose.model("Cart", cartSchema);

