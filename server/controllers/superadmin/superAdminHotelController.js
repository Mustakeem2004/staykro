const Hotel = require("../../models/Hotel");

// Create hotel with Cloudinary images
const superAdminAddHotel = async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      description,
      starRating,
      mapLink,
      mapEmbedUrl,
      coordinates,
      amenities,
      policies,
      rooms,
    } = req.body;

    const lowerCity=city.toLowerCase();
    const thumbnail = req.files['mainPhoto'] ? req.files['mainPhoto'][0].path : null;
    const images = req.files['gallery'] ? req.files['gallery'].map(file => file.path) : [];

    const newHotel = new Hotel({
      name,
      city: lowerCity,
      address,
      description,
      starRating,
      thumbnail,
      images,
      mapLink: mapLink || "",
      mapEmbedUrl: mapEmbedUrl || "",
      coordinates: coordinates ? JSON.parse(coordinates) : {},
      amenities: amenities ? JSON.parse(amenities) : [],
      policies: policies ? JSON.parse(policies) : {},
      rooms: rooms ? JSON.parse(rooms) : [],
      addedBy: req.admin?._id || null,
    });

    const savedHotel = await newHotel.save();
    res.status(201).json({ success: true, hotel: savedHotel });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ success: false, message: "Failed to add hotel" });
  }
};




// 👤 Get hotel by adminId
const getAdminHotel = async (req, res) => {
  try {
    const { adminId } = req.params;
    const hotel = await Hotel.findOne({ adminId });

    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found for this admin" });
    }

    res.status(200).json({ success: true, hotel });
  } catch (err) {
    console.error("Error fetching admin hotel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch hotels" });
  }
};

// Get hotel by ID
// const getHotelById = async (req, res) => {
//   try {    
//     const hotel = await Hotel.findById(req.params.id,{
//         name: 1,
//         city: 1,
//         address: 1,
//         pricePerNight: 1,
//         starRating: 1,
//         thumbnail: 1,
//       }
//     );
//     if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    
//     res.status(200).json({ success: true, hotel });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotel" });
//   }
// };






// const getHotelDetailsById= async (req, res) => {
//   try {    
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    
//     res.status(200).json({ success: true, hotel });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotel" });
//   }
// };



// Get hotels by city (only required fields for HotelList)
// const getHotelsForCartById = async (req, res) => {
//   try {
    
//     const hotel = await Hotel.findById(
//       req.params.id,
//       {
//         name: 1,
//         city: 1,
//         address: 1,
//         pricePerNight: 1,
//         starRating: 1,
//         thumbnail: 1,
//       }
//     ); // select only necessary fields
//     if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });

//     res.status(200).json({ success: true, hotel});
//   } catch (error) {
//     console.error("Error fetching hotels for list:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotels" });
//   }
// };



const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });

    // Optional: admin check
    // if (hotel.addedBy.toString() !== req.admin._id.toString()) {
    //   return res.status(403).json({ success: false, message: "Not authorized to update this hotel" });
    // }

    // Simple fields
    ["name", "city", "address", "description", "mapLink", "mapEmbedUrl"].forEach(field => {
      if (req.body[field] !== undefined) hotel[field] = req.body[field];
    });

    // Numbers
    if (req.body.starRating !== undefined) hotel.starRating = Number(req.body.starRating);

    // Nested JSON
    if (req.body.coordinates) hotel.coordinates = JSON.parse(req.body.coordinates);
    // if (req.body.amenities) hotel.amenities = JSON.parse(req.body.amenities);
    if (req.body.rooms) hotel.rooms = JSON.parse(req.body.rooms);
    if (req.body.policies) hotel.policies = JSON.parse(req.body.policies);

    // Images
    if (req.files) {
      if (req.files["mainPhoto"] && req.files["mainPhoto"][0]) {
        hotel.thumbnail = req.files["mainPhoto"][0].path;
      }
      if (req.files["gallery"] && req.files["gallery"].length > 0) {
        hotel.images = req.files["gallery"].map(file => file.path);
      }
    }

    const updatedHotel = await hotel.save();
    res.status(200).json({ success: true, hotel: updatedHotel });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ success: false, message: "Failed to update hotel" });
  }
};



// Delete hotel
const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    res.status(200).json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete hotel" });
  }
};

// Get hotels by city
// const getHotelsByCity = async (req, res) => {
//   try {
//     const hotels = await Hotel.find({ city: req.params.city });
//     res.status(200).json({ success: true, hotels });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotels by city" });
//   }
// };





// Get hotels by city (only required fields for HotelList)
// const getHotelsForListByCity = async (req, res) => {
//   try {
//     const hotels = await Hotel.find(
//       { city: req.params.city },
//       {
//         name: 1,
//         city: 1,
//         address: 1,
//         pricePerNight: 1,
//         starRating: 1,
//         thumbnail: 1,
//       }
//     ); // select only necessary fields

//     res.status(200).json({ success: true, hotels });
//   } catch (error) {
//     console.error("Error fetching hotels for list:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotels" });
//   }
// };


const deleteHotelImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image URL required" });
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    // Remove image URL from the hotel's images array
    hotel.images = hotel.images.filter((img) => img !== imageUrl);
    await hotel.save();

    // Delete image file from server if stored locally
    const filePath = path.join(__dirname, "..", imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting hotel image:", error);
    return res.status(500).json({ success: false, message: "Failed to delete image" });
  }
};


module.exports = {
  superAdminAddHotel,
  getAllHotels,
  // getHotelById,
  updateHotel,
  deleteHotel,
  deleteHotelImage,
  // getHotelsByCity,
  // getHotelsForListByCity,
  // getHotelsForCartById,
  // getHotelDetailsById,
  getAdminHotel ,
  
};


