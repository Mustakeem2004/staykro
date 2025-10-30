const Hotel = require("../../models/Hotel");
const Booking = require("../../models/Booking");
const User = require("../../models/User");

// Admin dashboard stats
const getAdminDashboard = async (req, res) => {
  try {
    // Count totals
    const totalHotels = await Hotel.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Optionally: total revenue
    const revenueAgg = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .populate("hotelId", "name city")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalHotels,
        totalUsers,
        totalBookings,
        totalRevenue
      },
      recentBookings
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server error fetching dashboard data" });
  }
};

module.exports = {
  getAdminDashboard
};
