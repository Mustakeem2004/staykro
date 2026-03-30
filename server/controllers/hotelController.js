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
    ).lean();// select only necessary fields

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




// 🚀 Seed dummy hotels (Temporary for data injection)
const seedDummyHotels = async (req, res) => {
  try {
    const dummyHotels = [
      // --- NAINITAL (5 Hotels) ---
      {
        name: "The Grand Palace Nainital",
        city: "Nainital",
        address: "Upper Mall Road, Nainital",
        description: "A heritage stay with a panoramic view of the Naini Lake. Luxury at its best.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111059.9016182101!2d79.38139527666249!3d29.3828331139417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Lake View", "Parking", "Restaurant"],
        basePricePerNight: 4500,
        rooms: [{ roomType: "Lake View Suite", pricePerNight: 4500, BasicGuestQuantity: 2, maxGuests: 3, roomImages: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"], availableRooms: 4, roomAmenities: ["AC", "TV"] }],
        status: "active"
      },
      {
        name: "Hillview Retreat",
        city: "Nainital",
        address: "Zoo Road, Tallital, Nainital",
        description: "Quiet and cozy retreat tucked away in the hills. Perfect for couples.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1495365200479-c4ed1d392724?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111059.9016182101!2d79.38139527666249!3d29.3828331139417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Hills View", "Bonfire"],
        basePricePerNight: 2800,
        rooms: [{ roomType: "Deluxe Hill Room", pricePerNight: 2800, BasicGuestQuantity: 2, maxGuests: 2, roomImages: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"], availableRooms: 6, roomAmenities: ["Heater"] }],
        status: "active"
      },
      {
        name: "Lake Side Inn",
        city: "Nainital",
        address: "Bheemtal Road, Nainital",
        description: "Budget friendly inn with essential comforts and quick access to the lake.",
        starRating: 3,
        thumbnail: "https://images.unsplash.com/photo-1551882547-ff43c33f7825?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111059.9016182101!2d79.38139527666249!3d29.3828331139417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Breakfast"],
        basePricePerNight: 1800,
        rooms: [{ roomType: "Standard Queen", pricePerNight: 1800, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 10, roomAmenities: ["TV"] }],
        status: "active"
      },
      {
        name: "Pine Forest Woods",
        city: "Nainital",
        address: "Ayarpatta Hill, Nainital",
        description: "Stay among the tall pines. Nature walks and serenity guaranteed.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111059.9016182101!2d79.38139527666249!3d29.3828331139417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Nature Walks", "Restaurant"],
        basePricePerNight: 3200,
        rooms: [{ roomType: "Pine Suite", pricePerNight: 3200, BasicGuestQuantity: 2, maxGuests: 4, roomImages: [], availableRooms: 5, roomAmenities: ["Balcony"] }],
        status: "active"
      },
      {
        name: "Nainital Heritage Villa",
        city: "Nainital",
        address: "Mallital, Nainital",
        description: "A colonial era villa converted into a boutique hotel. Traditional charm with modern luxury.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1549412650-ef3bb7839603?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111059.9016182101!2d79.38139527666249!3d29.3828331139417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Library", "Fine Dining"],
        basePricePerNight: 6000,
        rooms: [{ roomType: "Royal Suite", pricePerNight: 6000, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 2, roomAmenities: ["Bathtub"] }],
        status: "active"
      },

      // --- RISHIKESH (5 Hotels) ---
      {
        name: "Divine Ganga Cottage",
        city: "Rishikesh",
        address: "Laxman Jhula, Rishikesh",
        description: "Feel the vibes of the Ganges. Budget stay with amazing views.",
        starRating: 3,
        thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1527853787696-f7be74f2e30a?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110523.63344605151!2d78.21980315480287!3d30.108428205269786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925e37f00508b%3A0xe54fbbe28f1cc648!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Ganga View", "Cafe"],
        basePricePerNight: 1500,
        rooms: [{ roomType: "Standard Ganges", pricePerNight: 1500, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 12, roomAmenities: ["Fan"] }],
        status: "active"
      },
      {
        name: "Soul Sanctuary Spa",
        city: "Rishikesh",
        address: "Tapovan, Rishikesh",
        description: "Luxury spa and wellness resort for total relaxation and spiritual healing.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110523.63344605151!2d78.21980315480287!3d30.108428205269786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925e37f00508b%3A0xe54fbbe28f1cc648!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Spa", "Yoga Hall", "Pool"],
        basePricePerNight: 5500,
        rooms: [{ roomType: "Zenn Suite", pricePerNight: 5500, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 5, roomAmenities: ["AC", "Bathtub"] }],
        status: "active"
      },
      {
        name: "Yoga Junction Stays",
        city: "Rishikesh",
        address: "Muni Ki Reti, Rishikesh",
        description: "Ideally located for yoga seekers. Clean rooms and healthy food.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110523.63344605151!2d78.21980315480287!3d30.108428205269786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925e37f00508b%3A0xe54fbbe28f1cc648!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Organic Meals", "Meditation Space"],
        basePricePerNight: 2200,
        rooms: [{ roomType: "Wellness Room", pricePerNight: 2200, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 8, roomAmenities: ["AC"] }],
        status: "active"
      },
      {
        name: "Rishikesh Riverfront Suites",
        city: "Rishikesh",
        address: "AIIMS Road, Rishikesh",
        description: "Modern luxury with direct private access to the Ganges river banks.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110523.63344605151!2d78.21980315480287!3d30.108428205269786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925e37f00508b%3A0xe54fbbe28f1cc648!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Private River Access", "Fine Dining"],
        basePricePerNight: 7500,
        rooms: [{ roomType: "Emerald Suite", pricePerNight: 7500, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 4, roomAmenities: ["Jacuzzi"] }],
        status: "active"
      },
      {
        name: "The Beatles Ashram View Hotel",
        city: "Rishikesh",
        address: "Near Beatles Ashram, Rishikesh",
        description: "Themed hotel with a funky vibe and great views of the historic ashram area.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110523.63344605151!2d78.21980315480287!3d30.108428205269786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925e37f00508b%3A0xe54fbbe28f1cc648!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Library", "Rooftop Cafe"],
        basePricePerNight: 3500,
        rooms: [{ roomType: "Pop Art Studio", pricePerNight: 3500, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 7, roomAmenities: ["AC"] }],
        status: "active"
      },

      // --- DEHRADUN (5 Hotels) ---
      {
        name: "Dehradun Heights Luxury",
        city: "Dehradun",
        address: "Rajpur Road, Dehradun",
        description: "High-end urban luxury in the heart of the city's commercial district.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.42761858567!2d77.93581786685002!3d30.325556276274483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c7faa0d1e3%3A0xd14ec5018cb17482!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Pool", "Corporate Lounge"],
        basePricePerNight: 5200,
        rooms: [{ roomType: "Global Suite", pricePerNight: 5200, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 6, roomAmenities: ["Work Desk"] }],
        status: "active"
      },
      {
        name: "Mussoorie Road Resort",
        city: "Dehradun",
        address: "Old Mussoorie Road, Dehradun",
        description: "Charming resort on the way to Mussoorie. Lush green surroundings.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.42761858567!2d77.93581786685002!3d30.325556276274483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c7faa0d1e3%3A0xd14ec5018cb17482!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Garden", "Hiking Trails"],
        basePricePerNight: 3800,
        rooms: [{ roomType: "Garden Cottage", pricePerNight: 3800, BasicGuestQuantity: 2, maxGuests: 4, roomImages: [], availableRooms: 4, roomAmenities: ["Balcony"] }],
        status: "active"
      },
      {
        name: "The Doon Valley Inn",
        city: "Dehradun",
        address: "ISBT Road, Dehradun",
        description: "Conveniently located for travelers. Modern amenities and friendly service.",
        starRating: 3,
        thumbnail: "https://images.unsplash.com/photo-1551882547-ff43c33f7825?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.42761858567!2d77.93581786685002!3d30.325556276274483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c7faa0d1e3%3A0xd14ec5018cb17482!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Fast Check-in"],
        basePricePerNight: 1900,
        rooms: [{ roomType: "Smart Double", pricePerNight: 1900, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 15, roomAmenities: ["TV"] }],
        status: "active"
      },
      {
        name: "Forest Bliss Eco-Stays",
        city: "Dehradun",
        address: "Sahastradhara, Dehradun",
        description: "Eco-friendly stay near the famous warm springs. Pure air and healing vibes.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.42761858567!2d77.93581786685002!3d30.325556276274483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c7faa0d1e3%3A0xd14ec5018cb17482!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Eco-friendly", "Spa", "Natural Pool"],
        basePricePerNight: 4200,
        rooms: [{ roomType: "Aura Suite", pricePerNight: 4200, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 5, roomAmenities: ["Sky Roof"] }],
        status: "active"
      },
      {
        name: "The Doon Retreat Boutique",
        city: "Dehradun",
        address: "Old Survey Road, Dehradun",
        description: "Small, intimate boutique hotel with curated Uttarakhandi art and decor.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.42761858567!2d77.93581786685002!3d30.325556276274483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c7faa0d1e3%3A0xd14ec5018cb17482!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Art Gallery", "Signature Cafe"],
        basePricePerNight: 6500,
        rooms: [{ roomType: "Artist Studio", pricePerNight: 6500, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 3, roomAmenities: ["Easels"] }],
        status: "active"
      },

      // --- BHIMTAL (5 Hotels) ---
      {
        name: "Bhimtal Lake Side Palace",
        city: "Bhimtal",
        address: "Naukuchiatal Crossing, Bhimtal",
        description: "Premium lake front property. Breathtaking sunsets and quiet luxury.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27773.085000969564!2d79.53755378771343!3d29.344400267713583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a38217d85c4b%3A0xe62e0b62d8ea2e0!2sBhimtal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Lake View", "Kayaking", "Restaurant"],
        basePricePerNight: 4800,
        rooms: [{ roomType: "Shore Suite", pricePerNight: 4800, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 5, roomAmenities: ["Binoculars"] }],
        status: "active"
      },
      {
        name: "The Hill-Nest Bhimtal",
        city: "Bhimtal",
        address: "Jungliagaon Road, Bhimtal",
        description: "Nestled in the hills of Bhimtal, offering a birds-eye view of the lake.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1495365200479-c4ed1d392724?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27773.085000969564!2d79.53755378771343!3d29.344400267713583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a38217d85c4b%3A0xe62e0b62d8ea2e0!2sBhimtal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Hill Trekking", "Cafe"],
        basePricePerNight: 3200,
        rooms: [{ roomType: "Cloud Room", pricePerNight: 3200, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 8, roomAmenities: ["Balcony"] }],
        status: "active"
      },
      {
        name: "Fishermans Den",
        city: "Bhimtal",
        address: "Lake Edge, Bhimtal",
        description: "Rustic themed hotel for fishing enthusiasts and lake lovers.",
        starRating: 3,
        thumbnail: "https://images.unsplash.com/photo-1551882547-ff43c33f7825?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27773.085000969564!2d79.53755378771343!3d29.344400267713583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a38217d85c4b%3A0xe62e0b62d8ea2e0!2sBhimtal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Fishing Gear", "Boat Hire"],
        basePricePerNight: 1600,
        rooms: [{ roomType: "Log Cabin", pricePerNight: 1600, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 4, roomAmenities: ["Heater"] }],
        status: "active"
      },
      {
        name: "Butterflies & Meadows",
        city: "Bhimtal",
        address: "Kuti, Bhimtal",
        description: "Serene boutique resort famous for the thousands of butterflies in its gardens.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27773.085000969564!2d79.53755378771343!3d29.344400267713583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a38217d85c4b%3A0xe62e0b62d8ea2e0!2sBhimtal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Butterfly Garden", "Tea Lounge"],
        basePricePerNight: 3500,
        rooms: [{ roomType: "Meadow View", pricePerNight: 3500, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 6, roomAmenities: ["Patio"] }],
        status: "active"
      },
      {
        name: "The Bhimtal Lakeview Grand",
        city: "Bhimtal",
        address: "Ghora Kal Road, Bhimtal",
        description: "Grand legacy hotel known for its impeccable hospitality and wide lake views.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1549412650-ef3bb7839603?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27773.085000969564!2d79.53755378771343!3d29.344400267713583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a38217d85c4b%3A0xe62e0b62d8ea2e0!2sBhimtal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Pool", "Grand Ballroom"],
        basePricePerNight: 5800,
        rooms: [{ roomType: "Royal Lake Suite", pricePerNight: 5800, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 4, roomAmenities: ["Jacuzzi"] }],
        status: "active"
      },

      // --- MUSSOORIE (5 Hotels) ---
      {
        name: "The Mussoorie Grand Mall",
        city: "Mussorie",
        address: "Mall Road Center, Mussoorie",
        description: "Classic stay right at the heart of the action with stunning valley views.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54964.88795079456!2d78.03348270543666!3d30.454921935619177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d0cfa61cda5b%3A0x197fd47d980e85b1!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Mall Access", "Fine Dining"],
        basePricePerNight: 5200,
        rooms: [{ roomType: "Valley View Deluxe", pricePerNight: 5200, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 8, roomAmenities: ["AC"] }],
        status: "active"
      },
      {
        name: "Mist & Clouds Resort",
        city: "Mussorie",
        address: "Clouds End, Mussoorie",
        description: "Stay among the clouds. Silent, misty and incredibly beautiful.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1549412650-ef3bb7839603?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54964.88795079456!2d78.03348270543666!3d30.454921935619177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d0cfa61cda5b%3A0x197fd47d980e85b1!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Scenic Deck", "Restaurant"],
        basePricePerNight: 4000,
        rooms: [{ roomType: "Mist Room", pricePerNight: 4000, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 6, roomAmenities: ["Balcony"] }],
        status: "active"
      },
      {
        name: "The Mussoorie Inn",
        city: "Mussorie",
        address: "Landour Road, Mussoorie",
        description: "Budget friendly and located in the historic Landour area.",
        starRating: 3,
        thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54964.88795079456!2d78.03348270543666!3d30.454921935619177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d0cfa61cda5b%3A0x197fd47d980e85b1!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Bakery Nearby"],
        basePricePerNight: 1600,
        rooms: [{ roomType: "Standard Queen", pricePerNight: 1600, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 12, roomAmenities: ["Heater"] }],
        status: "active"
      },
      {
        name: "Camel's Back Luxury Stays",
        city: "Mussorie",
        address: "Camel's Back Road, Mussoorie",
        description: "Elegant suites situated along the famous scenic walking trail.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54964.88795079456!2d78.03348270543666!3d30.454921935619177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d0cfa61cda5b%3A0x197fd47d980e85b1!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Private Balcony", "Room Service"],
        basePricePerNight: 3500,
        rooms: [{ roomType: "Backrest Studio", pricePerNight: 3500, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 5, roomAmenities: ["Bathtub"] }],
        status: "active"
      },
      {
        name: "Himalayan Peak Boutique",
        city: "Mussorie",
        address: "Kempty Falls Road, Mussoorie",
        description: "Offers the best snow peak views in the region. Luxury and peace combined.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54964.88795079456!2d78.03348270543666!3d30.454921935619177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d0cfa61cda5b%3A0x197fd47d980e85b1!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Telescope Deck", "Cafe"],
        basePricePerNight: 6800,
        rooms: [{ roomType: "Peak View Suite", pricePerNight: 6800, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 3, roomAmenities: ["Jacuzzi"] }],
        status: "active"
      },

      // --- JIM CORBETT (5 Hotels) ---
      {
        name: "The Jungle Crown Corbett",
        city: "Jim Corbett",
        address: "Dhikala Zone Entrance, Jim Corbett",
        description: "Deep in the jungle feel. Luxury tents and world-class safari arrangements.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111246.732731805!2d79.03310023602167!3d29.387902598858348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a169b00eb820d%3A0x286395dc2dbdc894!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Safari Booking", "Jungle Guide", "Pool"],
        basePricePerNight: 6500,
        rooms: [{ roomType: "Safari Tent", pricePerNight: 6500, BasicGuestQuantity: 2, maxGuests: 3, roomImages: [], availableRooms: 10, roomAmenities: ["AC"] }],
        status: "active"
      },
      {
        name: "River Side Safari Lodge",
        city: "Jim Corbett",
        address: "Kosi River Bank, Jim Corbett",
        description: "Listen to the river while you wait for the jungle to wake up.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1605537965004-ca05ff64db9f?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111246.732731805!2d79.03310023602167!3d29.387902598858348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a169b00eb820d%3A0x286395dc2dbdc894!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["River Access", "Fishing", "Bonfire"],
        basePricePerNight: 3500,
        rooms: [{ roomType: "River Suite", pricePerNight: 3500, BasicGuestQuantity: 2, maxGuests: 4, roomImages: [], availableRooms: 6, roomAmenities: ["AC"] }],
        status: "active"
      },
      {
        name: "Wild Trails Resort",
        city: "Jim Corbett",
        address: "Ramnagar, Jim Corbett",
        description: "Adrenaline fueling adventure stays with trekking and safaris.",
        starRating: 4,
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111246.732731805!2d79.03310023602167!3d29.387902598858348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a169b00eb820d%3A0x286395dc2dbdc894!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Trekking", "Safari", "Gym"],
        basePricePerNight: 4200,
        rooms: [{ roomType: "Explorer Room", pricePerNight: 4200, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 8, roomAmenities: ["AC"] }],
        status: "active"
      },
      {
        name: "The Corbett Inn",
        city: "Jim Corbett",
        address: "Mohan, Jim Corbett",
        description: "Simple, clean, and best value for money in the Jim Corbett area.",
        starRating: 3,
        thumbnail: "https://images.unsplash.com/photo-1551882547-ff43c33f7825?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111246.732731805!2d79.03310023602167!3d29.387902598858348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a169b00eb820d%3A0x286395dc2dbdc894!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Breakfast"],
        basePricePerNight: 1400,
        rooms: [{ roomType: "Economy Double", pricePerNight: 1400, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 12, roomAmenities: ["Fan"] }],
        status: "active"
      },
      {
        name: "Tiger Kingdom Spa & Resort",
        city: "Jim Corbett",
        address: "Bailpara, Jim Corbett",
        description: "Unmatched luxury within the Corbett vicinity. Premium spa and amazing wildlife sightings.",
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111246.732731805!2d79.03310023602167!3d29.387902598858348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a169b00eb820d%3A0x286395dc2dbdc894!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        amenities: ["Free WiFi", "Spa", "Tiger Sightseeing Tours"],
        basePricePerNight: 8500,
        rooms: [{ roomType: "Kingdom Suite", pricePerNight: 8500, BasicGuestQuantity: 2, maxGuests: 2, roomImages: [], availableRooms: 4, roomAmenities: ["Private Pool"] }],
        status: "active"
      }
    ];

    // Optional: remove previous matching hotels to keep clean
    const names = dummyHotels.map(h => h.name);
    await Hotel.deleteMany({ name: { $in: names } });

    const results = await Hotel.insertMany(dummyHotels);
    res.status(201).json({ success: true, message: `Successfully seeded ${results.length} hotels into trending destinations.` });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ success: false, message: "Seeding failed", error: error.message });
  }
};

// ✅ Export all
module.exports = {
  getAllHotels,
  getHotelsByCity,
  getHotelById,
  getHotelDetails,
};
