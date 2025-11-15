const Hotel = require("../../models/Hotel");
const fs = require("fs");
const path = require("path");

// Create hotel with Cloudinary images


const addHotel = async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      description,
      starRating,
      mapEmbedUrl,
      amenities,
      policies,
      rooms,
      basePricePerNight,
    } = req.body;

    const adminId = req.admin?._id || req.admin?.id || null;

    // ✅ Basic validation
    if (!name || !city || !address || !starRating || !basePricePerNight) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const lowerCity = city.trim().toLowerCase();

    // ✅ Extract file URLs
    const thumbnail = req.files?.mainPhoto?.[0]?.path || null;
    const images = req.files?.gallery?.map((file) => file.path) || [];
    const roomImages = req.files?.roomPhotos?.map((file) => file.path) || [];

    if (!thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "Main photo is required." });
    }

    // ✅ Parse JSON fields safely
    const parsedAmenities = amenities ? JSON.parse(amenities) : [];
    const parsedPolicies = policies ? JSON.parse(policies) : [];
    let parsedRooms = rooms ? JSON.parse(rooms) : [];

    // ✅ Handle room images mapping
    const roomIndices = req.body.roomIndices
      ? JSON.parse(req.body.roomIndices)
      : [];
    const roomImageUrls = roomImages || [];

    // Map room images to their corresponding room
    const roomImagesMap = {};
    roomImageUrls.forEach((url, index) => {
      const roomIndex = roomIndices[index];
      if (!roomImagesMap[roomIndex]) {
        roomImagesMap[roomIndex] = [];
      }
      roomImagesMap[roomIndex].push(url);
    });

    // Attach roomImages to parsedRooms
    parsedRooms = parsedRooms.map((room, index) => ({
      ...room,
      roomImages: roomImagesMap[index] || [],
    }));

    // ✅ Create and save hotel
    const newHotel = new Hotel({
      name: name.trim(),
      city: lowerCity,
      address: address.trim(),
      description: description?.trim() || "",
      starRating: Number(starRating),
      thumbnail,
      images,
      mapEmbedUrl: mapEmbedUrl?.trim() || "",
      amenities: parsedAmenities,
      policies: parsedPolicies,
      rooms: parsedRooms,
      basePricePerNight: Number(basePricePerNight),
      addedBy: adminId,
    });

    const savedHotel = await newHotel.save();

    res.status(201).json({
      success: true,
      message: "Hotel added successfully with room images.",
      hotel: savedHotel,
    });
  } catch (error) {
    console.error("❌ Error adding hotel:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Failed to add hotel" });
  }
};


// const addHotel = async (req, res) => {
//   try {
//     const {
//       name,
//       city,
//       address,
//       description,
//       starRating,
//       mapEmbedUrl,
//       amenities,
//       policies,
//       rooms,
//       basePricePerNight,
//     } = req.body;

//     const adminId = req.admin?._id || req.admin?.id || null;

//     // ✅ 1. Basic validation
//     if (!name || !city || !address || !starRating || !basePricePerNight) {
//       return res.status(400).json({ success: false, message: "Missing required fields." });
//     }

//     const lowerCity = city.trim().toLowerCase();

//     // ✅ 2. Extract file URLs safely
//     const thumbnail = req.files?.mainPhoto?.[0]?.path || null;
//     const images = req.files?.gallery?.map(file => file.path) || [];
//     const roomImages = req.files?.roomPhotos?.map(file => file.path) || [];

//     if (!thumbnail) {
//       return res.status(400).json({ success: false, message: "Main photo is required." });
//     }

//     // ✅ 3. Parse JSON string fields safely
//     const parsedAmenities = amenities ? JSON.parse(amenities) : [];
//     const parsedPolicies = policies ? JSON.parse(policies) : [];
//     let parsedRooms = rooms ? JSON.parse(rooms) : [];

//     // ✅ 4. Distribute uploaded room images across rooms
//     let roomImageIndex = 0;
//     parsedRooms = parsedRooms.map((room) => {
//       // Get the next batch of images for this room (however many were uploaded for it)
//       const nextImages = roomImages.slice(
//         roomImageIndex,
//         roomImageIndex + (room.uploadCount || 0)
//       );
//       roomImageIndex += (room.uploadCount || 0);
      
//       return {
//         ...room,
//         roomImages: nextImages, // Only include the image URLs
//       };
//     });

//     // ✅ 5. Create and save hotel
//     const newHotel = new Hotel({
//       name: name.trim(),
//       city: lowerCity,
//       address: address.trim(),
//       description: description?.trim() || "",
//       starRating: Number(starRating),
//       thumbnail,
//       images,
//       mapEmbedUrl: mapEmbedUrl?.trim() || "",
//       amenities: parsedAmenities,
//       policies: parsedPolicies,
//       rooms: parsedRooms,
//       basePricePerNight: Number(basePricePerNight),
//       addedBy: adminId,
//     });

//     const savedHotel = await newHotel.save();

//     res.status(201).json({
//       success: true,
//       message: "Hotel added successfully with room images.",
//       hotel: savedHotel,
//     });
//   } catch (error) {
//     console.error("❌ Error adding hotel:", error);
//     res.status(500).json({ success: false, message: error.message || "Failed to add hotel" });
//   }
// };

// module.exports = { addHotel };



// const addHotel = async (req, res) => {
//   try {
//     const {
//       name,
//       city,
//       address,
//       description,
//       starRating,
//       mapEmbedUrl,
//       amenities,
//       policies,
//       rooms,
//       basePricePerNight,
//     } = req.body;

//     const adminId = req.admin?._id || req.admin?.id || null;

//     // Basic validation
//     if (!name || !city || !address || !starRating || !basePricePerNight) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing required fields." });
//     }

//     // Normalize city name
//     const lowerCity = city.trim().toLowerCase();

//     // Handle file uploads (via multer)
//     const thumbnail = req.files?.mainPhoto?.[0]?.path || null;
//     const images = req.files?.gallery
//       ? req.files.gallery.map((file) => file.path)
//       : [];

//     if (!thumbnail) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Main photo is required." });
//     }

//     if (!images.length) {
//       return res
//         .status(400)
//         .json({ success: false, message: "At least one gallery image is required." });
//     }

//     // Safely parse JSON fields
//     const parsedAmenities = amenities ? JSON.parse(amenities) : [];
//     const parsedPolicies = policies ? JSON.parse(policies) : {};
//     const parsedRooms = rooms ? JSON.parse(rooms) : [];

//     // Create new hotel document
//     const newHotel = new Hotel({
//       name: name.trim(),
//       city: lowerCity,
//       address: address.trim(),
//       description: description?.trim() || "",
//       starRating: Number(starRating),
//       thumbnail,
//       images,
//       mapEmbedUrl: mapEmbedUrl?.trim() || "",
//       amenities: parsedAmenities,
//       policies: parsedPolicies,
//       rooms: parsedRooms,
//       basePricePerNight: Number(basePricePerNight),
//       addedBy: adminId,
//     });

//     // Save hotel to database
//     const savedHotel = await newHotel.save();

//     res.status(201).json({
//       success: true,
//       message: "Hotel added successfully.",
//       hotel: savedHotel,
//     });
//   } catch (error) {
//     console.error("❌ Error adding hotel:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to add hotel.",
//     });
//   }
// };






// 👤 Get hotel by adminId
// const getAdminHotel = async (req, res) => {
//   try {
//     const { adminId } = req.params;
//     const hotel = await Hotel.findOne({ adminId });

//     if (!hotel) {
//       return res.status(404).json({ success: false, message: "Hotel not found for this admin" });
//     }

//     res.status(200).json({ success: true, hotel });
//   } catch (err) {
//     console.error("Error fetching admin hotel:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const getAdminHotel = async (req, res) => {
  try {
    const { adminId } = req.params;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    // ✅ Find all hotels where addedBy = adminId
    const hotels = await Hotel.find({ addedBy: adminId });

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hotels found for this admin",
      });
    }

    res.status(200).json({ success: true, hotels });
  } catch (err) {
    console.error("Error fetching admin hotels:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};






// Get all hotels
// const getAllHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, hotels });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch hotels" });
//   }
// };

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
["name", "city", "address", "description", "mapEmbedUrl"].forEach(field => {
  if (req.body[field] !== undefined) hotel[field] = req.body[field];
});

    // Numbers
    if (req.body.starRating !== undefined) hotel.starRating = Number(req.body.starRating);

    // Nested JSON
    if (req.body.coordinates) hotel.coordinates = JSON.parse(req.body.coordinates);
if (req.body.amenities) {
  try {
    const parsedAmenities = JSON.parse(req.body.amenities);
    if (Array.isArray(parsedAmenities)) {
      hotel.amenities = parsedAmenities;
    }
  } catch (err) {
    console.error("Invalid amenities format:", err);
  }
}

    if (req.body.rooms) hotel.rooms = JSON.parse(req.body.rooms);
    if (req.body.policies) hotel.policies = JSON.parse(req.body.policies);

    // Images
    if (req.files) {
      if (req.files["mainPhoto"] && req.files["mainPhoto"][0]) {
        hotel.thumbnail = req.files["mainPhoto"][0].path;
      }
      if (req.files["gallery"] && req.files["gallery"].length > 0) {
  // If there were already some gallery images, add new ones to it
  hotel.images.push(...req.files["gallery"].map(file => file.path));
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


module.exports = {
  addHotel,
  // getAllHotels,
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
