// server/middlewares/uploadMiddleware.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "mainPhoto") {
      return {
        folder: "hotels/main",
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 800, height: 600, crop: "limit", quality: "auto" }],
      };
    } else if (file.fieldname === "gallery") {
      return {
        folder: "hotels/gallery",
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 1024, height: 768, crop: "limit", quality: "auto" }],
      };
    }
  },
});

const uploadHotelPhotos = multer({ storage });

module.exports = { uploadHotelPhotos };
