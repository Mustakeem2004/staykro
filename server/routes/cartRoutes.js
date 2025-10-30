const express = require("express");
const router = express.Router();
const authmiddleware=require("../middleware/authMiddleware")
const cartController = require("../controllers/cartController");

// ➕ Add a hotel to cart
router.post("/add", cartController.addToCart);


router.post("/merge",authmiddleware ,cartController.mergeCart);

// 🗑 Remove a hotel from cart
router.delete("/remove/:userId/:hotelId", cartController.removeFromCart);

// 📦 Get the current cart for a user
router.get("/:userId", cartController.getUserCart);

module.exports = router;
