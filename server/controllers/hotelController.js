// ✅ server/controllers/hotelController.js

const Hotel = require("../models/Hotel");


// 🌍 Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().select("name city address pricePerNight starRating thumbnail");
    res.status(200).json({ success: true, hotels });
  } catch (err) {
    console.error("Error fetching hotels:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🏙️ Get hotels by city
const getHotelsByCity = async (req, res) => {
  try {
    const hotels = await Hotel.find(
      { city: req.params.city },
      {
        name: 1,
        city: 1,
        address: 1,
        basePricePerNight : 1,
        starRating: 1,
        thumbnail: 1,
      }
    ); // select only necessary fields

    res.status(200).json({ success: true, hotels });
  } catch (error) {
    console.error("Error fetching hotels for list:", error);
    res.status(500).json({ success: false, message: "Failed to fetch hotels" });
  }
};





// Get hotel by ID
const getHotelById = async (req, res) => {
  try {    
    const hotel = await Hotel.findById(req.params.id,{
        name: 1,
        city: 1,
        address: 1,
        basePricePerNight: 1,
        starRating: 1,
        thumbnail: 1,
      }
    );
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch hotel" });
  }
};



// 🔍 Get detailed hotel info
const getHotelDetails = async (req, res) => {
  try {    
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch hotel" });
  }
};




// ✅ Export all
module.exports = {
  getAllHotels,
  getHotelsByCity,
  getHotelById,
  getHotelDetails,
};
