// routes/payment.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

let razorpay = null;

// Initialize Razorpay only if credentials are available
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn("⚠️  Razorpay credentials not configured. Payment features disabled.");
}

// Create order
router.post("/orders", async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ 
        error: "Payment service not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." 
      });
    }
    
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order); // return entire order object to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
