const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
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

// app.use(
//   cors({
//     origin: [
//       "https://staykro.vercel.app",
//       "http://localhost:5173", 
//       "http://localhost:5174",
//       "https://travelwindow.vercel.app",
//       process.env.FRONTEND_URL // dynamic frontend URL from env
//     ].filter(Boolean),
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// )


app.use(
  cors({
    origin: ["https://staykro.vercel.app",
    "http://localhost:5173", 
      "http://localhost:5174",
      "https://travelwindow.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Security Middlewares ---
app.use(helmet());

// Apply a general rate limit to all requests
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per 15 minutes
  message: { error: "Too many requests from this IP, please try again after 15 minutes" },
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use("/api/", globalLimiter);

// Specifically strict limit on auth endpoints (login, signup) to prevent brute-forcing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 2000, 
  message: { error: "Too many login/signup attempts, please try again later" },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// this is routes
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/auth", authLimiter, authRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/hotel", require("./routes/hotel.js"));
app.use("/api/admin/bookings",adminAuth, adminBookingRoutes);
app.use("/api/admin/dashboard",adminAuth, adminDashboardRoutes);
app.use("/api/admin/auth", authLimiter, adminAuth, adminAuthRoutes);
app.use("/api/admin",require("./routes/adminRoutes/adminHotelRoutes.js"));
app.use("/api/user",hotelRoutes);
app.use("/api/superadmin", superAdminHotelRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    server: "staykro-backend",
    timestamp: new Date().toISOString(),
    cors: "enabled",
    environment: process.env.NODE_ENV || "development"
  });
});


// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



