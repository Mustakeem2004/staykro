const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongoDb = require("./config/db.js");
const passport = require("./config/passport.js");
const paymentRoutes = require("./routes/payment");
const adminBookingRoutes = require("./routes/adminRoutes/adminBookingRoutes");
const adminDashboardRoutes = require("./routes/adminRoutes/adminDashboardRoutes");
const adminAuthRoutes = require("./routes/adminRoutes/adminAuthRoutes");
const hotelRoutes = require("./routes/hotel.js");
const superAdminHotelRoutes = require("./routes/superAdminRoutes/superAdminHotelRoutes.js");
const authRoutes = require("./routes/auth");

const authmiddleware = require("./middleware/authMiddleware.js");
const adminAuth = require("./middleware/adminMiddleware.js");
// require("./routes/adminRoutes/")
const PORT = process.env.PORT || 3000;
const app = express();

// mongodbConnection
connectMongoDb();

// passport middleware
app.use(passport.initialize());

// cookie parser
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174",
      "https://staykro.vercel.app",
      "https://travelwindow.vercel.app",
      process.env.FRONTEND_URL // dynamic frontend URL from env
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is routes
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/auth", authRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/hotel", require("./routes/hotel.js"));
app.use("/api/admin/bookings",adminAuth, adminBookingRoutes);
app.use("/api/admin/dashboard",adminAuth, adminDashboardRoutes);
app.use("/api/admin/auth", adminAuth,adminAuthRoutes);
app.use("/api/admin",require("./routes/adminRoutes/adminHotelRoutes.js"));
app.use("/api/user",hotelRoutes);
app.use("/api/superadmin", superAdminHotelRoutes);




// --- Start server ---
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


