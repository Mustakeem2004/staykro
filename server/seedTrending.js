require("dotenv").config();
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/uttarakhandHotels";

const trendingCities = ["Nainital", "Rishikesh", "Dehradun", "Bhimtal", "Mussorie", "Jim Corbett"];

const seedHotels = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB...");

    for (const city of trendingCities) {
      // Check if hotels already exist for this city
      const existing = await Hotel.findOne({ city: new RegExp(`^${city}$`, "i") });
      if (existing) {
        console.log(`Hotel already exists for ${city}. Skipping...`);
        continue;
      }

      console.log(`Creating hotel for ${city}...`);
      const newHotel = new Hotel({
        name: `Grand StayKro Resort ${city}`,
        city: city,
        address: `123 Main Road, ${city}, Uttarakhand`,
        description: `Experience the best of ${city} at our premium resort. Enjoy breathtaking views, luxurious amenities, and exceptional service.`,
        starRating: 5,
        thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=500&auto=format&fit=crop&q=60"
        ],
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Parking"],
        basePricePerNight: Math.floor(Math.random() * 3000) + 2000,
        rooms: [
          {
            roomType: "Deluxe Suite",
            pricePerNight: Math.floor(Math.random() * 3000) + 2000,
            BasicGuestQuantity: 2,
            maxGuests: 3,
            roomImages: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60"],
            availableRooms: 5,
            roomAmenities: ["AC", "TV", "Mini Fridge"]
          }
        ],
        status: "active"
      });

      await newHotel.save();
      console.log(`Successfully added hotel for ${city}.`);
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedHotels();
