// server/routes/adminRoutes/adminHotelRoutes.js
const express = require("express");
const router = express.Router();
const { uploadHotelPhotos } = require("../../middleware/uploadMiddleware");
// const adminAuth = require("../../middleware/adminMiddleware");
const {
  addHotel,
  getAllHotels,
  // getHotelById,
  updateHotel,
  deleteHotel,
  // getHotelsByCity,
  // getHotelsForListByCity,
  // getHotelsForCartById,
  // getHotelDetailsById,
} = require("../../controllers/superadmin/superAdminHotelController");

// ✅ POST /admin/hotels → Add hotel
router.post(
  "/hotels",

  uploadHotelPhotos.fields([
    { name: "mainPhoto", maxCount: 1 }, // single main image
    { name: "gallery", maxCount: 10 },  // multiple gallery images
  ]),
  addHotel
);

// ✅ PUT /admin/hotels/:id → Update existing hotel
router.put(
  "/hotels/:id",
  uploadHotelPhotos.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateHotel
);

// ✅ Other routes
router.get("/hotels", getAllHotels);
// router.get("/hotels/:id", getHotelById);
// router.get("/hotels/details/:id", getHotelDetailsById);
router.delete("/hotels/:id", deleteHotel);
// router.get("/hotels/city/:city", getHotelsByCity);
// router.get("/hotelList/city/:city",getHotelsForListByCity);
// router.get("/hotel/cart/:id",getHotelsForCartById);

module.exports = router;
