// // server/routes/adminRoutes/adminHotelRoutes.js
// const express = require("express");
// const router = express.Router();
// const { uploadHotelPhotos } = require("../../middleware/uploadMiddleware");
// const adminAuth = require("../../middleware/adminMiddleware");
// const {
//   addHotel,
//   // getAllHotels,
//   // getHotelById,
//   updateHotel,
//   deleteHotel,
//   getAdminHotel,
//   deleteHotelImage,
//   // getHotelsByCity,
//   // getHotelsForListByCity,
//   // getHotelsForCartById,
//   // getHotelDetailsById,
// } = require("../../controllers/admin/adminHotelController");



// router.get("/hotels/:adminId",getAdminHotel);

// router.delete("/hotels/:id/delete-image", deleteHotelImage);

// // ✅ POST /admin/hotels → Add hotel
// router.post(
//   "/hotels",
//   adminAuth,

//   uploadHotelPhotos.fields([
//     { name: "mainPhoto", maxCount: 1 }, // single main image
//     { name: "gallery", maxCount: 100 },  // multiple gallery images
//     { name: "roomPhotos", maxCount: 10 },
//   ]),
//   addHotel
// );

// // ✅ PUT /admin/hotels/:id → Update existing hotel
// router.put(
//   "/hotels/:id",
//   uploadHotelPhotos.fields([
//     { name: "mainPhoto", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   updateHotel
// );



// // server/routes/adminRoutes/adminHotelRoutes.js
// router.get("/hotels/details/:id", async (req, res) => {
//   try {
//     const Hotel = require("../../models/Hotel");
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
//     res.status(200).json(hotel);
//   } catch (error) {
//     console.error("Error fetching hotel:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotel" });
//   }
// });


// // ✅ Other routes
// // router.get("/hotels", getAllHotels);
// // router.get("/hotels/:id", getHotelById);
// // router.get("/hotels/details/:id", getHotelDetailsById);
// router.delete("/hotels/:id", deleteHotel);
// // router.get("/hotels/city/:city", getHotelsByCity);
// // router.get("/hotelList/city/:city",getHotelsForListByCity);
// // router.get("/hotel/cart/:id",getHotelsForCartById);

// module.exports = router;






// server/routes/adminRoutes/adminHotelRoutes.js
const express = require("express");
const router = express.Router();
const { uploadHotelPhotos } = require("../../middleware/uploadMiddleware");
const adminAuth = require("../../middleware/adminMiddleware");
const {
  addHotel,
  updateHotel,
  deleteHotel,
  getAdminHotel,
  deleteHotelImage,
} = require("../../controllers/admin/adminHotelController");

// ✅ Get all hotels for admin
router.get("/hotels/:adminId", getAdminHotel);

// ✅ Delete specific image from hotel
router.delete("/hotels/:id/delete-image", deleteHotelImage);

// ✅ POST /admin/hotels → Add hotel
router.post(
  "/hotels",
  adminAuth,
  uploadHotelPhotos, // ✅ Just use middleware directly (no .fields())
  addHotel
);

// ✅ PUT /admin/hotels/:id → Update existing hotel
router.put(
  "/hotels/:id",
  uploadHotelPhotos, // ✅ same here
  updateHotel
);

// ✅ Get single hotel details by ID
router.get("/hotels/details/:id", async (req, res) => {
  try {
    const Hotel = require("../../models/Hotel");
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel)
      return res.status(404).json({ success: false, message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ success: false, message: "Failed to fetch hotel" });
  }
});

// ✅ Delete entire hotel
router.delete("/hotels/:id", deleteHotel);

module.exports = router;

