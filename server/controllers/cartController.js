const Cart = require("../models/Cart");


// 🧩 Merge guest cart with user cart on login
exports.mergeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { localCart } = req.body;

    if (!localCart?.length) {
      return res.json({ message: "No local cart items to merge." });
    }

    for (const item of localCart) {
      const exists = await Cart.findOne({ userId, hotelId: item._id });
      if (!exists) await Cart.create({ userId, hotelId: item._id });
    }

    // ✅ Fetch only selected hotel fields
    const updatedCart = await Cart.find({ userId }).populate("hotelId", {
      name: 1,
      city: 1,
      address: 1,
      pricePerNight: 1,
      starRating: 1,
      thumbnail: 1,
    });
   
    

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error merging cart:", error);
    res.status(500).json({ error: "Failed to merge cart" });
  }
};


// ➕ Add hotel to cart
exports.addToCart = async (req, res) => {
  const { userId, hotelId } = req.body;

  try {
    // Check if the hotel is already in the user's cart
    const existing = await Cart.findOne({ userId, hotelId });
    if (!existing) {
      await Cart.create({ userId, hotelId });
    }


    // Fetch updated cart with hotel details
    const updatedCart = await Cart.find({ userId }).populate("hotelId", {
      name: 1,
      city: 1,
      address: 1,
      pricePerNight: 1,
      starRating: 1,
      thumbnail: 1,
    });
    
    res.json(updatedCart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🗑 Remove hotel from cart
exports.removeFromCart = async (req, res) => {
  const { userId, hotelId } = req.params;

  

  try {
    await Cart.deleteOne({ userId, hotelId });

    // Fetch updated cart with hotel details
    const updatedCart = await Cart.find({ userId }).populate("hotelId", {
      name: 1,
      city: 1,
      address: 1,
      pricePerNight: 1,
      starRating: 1,
      thumbnail: 1,
    });
    
    res.json(updatedCart);
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📦 Get user's cart
exports.getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.find({ userId }).populate("hotelId", {
      name: 1,
      city: 1,
      address: 1,
      pricePerNight: 1,
      starRating: 1,
      thumbnail: 1,
    });
    res.json(cart);
  } catch (err) {
    console.error("Error fetching user cart:", err);
    res.status(500).json({ error: err.message });
  }
};
