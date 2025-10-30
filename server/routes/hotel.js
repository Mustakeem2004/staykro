// ✅ server/routes/hotel.js

const express = require("express");
const {
  getAllHotels,
  getHotelsByCity,
  getHotelById,
  getHotelDetails,
} = require("../controllers/hotelController");

const router = express.Router();

router.get("/hotels", getAllHotels);
router.get("/hotelList/city/:city", getHotelsByCity);
router.get("/hotels/:id", getHotelById);
router.get("/hotels/details/:id", getHotelDetails);




module.exports = router;
