require("dotenv").config();
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/uttarakhandHotels";

const dummyHotels = [
  {
    name: "Lake View Resort Nainital",
    city: "Nainital",
    address: "Mall Road, Nainital, Uttarakhand",
    description: "Experience the tranquility of Nainital lake right from your balcony. Premium amenities with a touch of nature.",
    starRating: 5,
    thumbnail: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=500&auto=format&fit=crop&q=60"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111059.9016182101!2d79.38139527666249!3d29.3828331139417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    amenities: ["Free WiFi", "Lake View", "Spa", "Restaurant", "Parking"],
    basePricePerNight: 3500,
    rooms: [
      {
        roomType: "Premium Lake View",
        pricePerNight: 3500,
        BasicGuestQuantity: 2,
        maxGuests: 3,
        roomImages: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60"],
        availableRooms: 5,
        roomAmenities: ["AC", "TV", "Mini Fridge", "Balcony"]
      }
    ],
    status: "active"
  },
  {
    name: "Ganga Kinare Retreat",
    city: "Rishikesh",
    address: "Tapovan, Rishikesh, Uttarakhand",
    description: "A peaceful retreat by the holy Ganges. Perfect for yoga, meditation, and spiritual awakening.",
    starRating: 4,
    thumbnail: "https://images.unsplash.com/photo-1605537965004-ca05ff64db9f?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110523.63344605151!2d78.21980315480287!3d30.108428205269786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390925e37f00508b%3A0xe54fbbe28f1cc648!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    amenities: ["Free WiFi", "Yoga Center", "Spa", "Vegetarian Restaurant"],
    basePricePerNight: 2500,
    rooms: [
      {
        roomType: "River View Room",
        pricePerNight: 2500,
        BasicGuestQuantity: 2,
        maxGuests: 4,
        roomImages: ["https://images.unsplash.com/photo-1598928506311-c55d40f95219?w=500&auto=format&fit=crop&q=60"],
        availableRooms: 8,
        roomAmenities: ["AC", "Balcony"]
      }
    ],
    status: "active"
  },
  {
    name: "Doon Valley Grand",
    city: "Dehradun",
    address: "Rajpur Road, Dehradun, Uttarakhand",
    description: "Luxurious stay in the heart of Dehradun Valley. Close to city attractions and nature.",
    starRating: 5,
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&auto=format&fit=crop&q=60"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.42761858567!2d77.93581786685002!3d30.325556276274483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c7faa0d1e3%3A0xd14ec5018cb17482!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    amenities: ["Free WiFi", "Swimming Pool", "Gym", "Restaurant", "Parking"],
    basePricePerNight: 4000,
    rooms: [
      {
        roomType: "Executive Suite",
        pricePerNight: 4000,
        BasicGuestQuantity: 2,
        maxGuests: 3,
        roomImages: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60"],
        availableRooms: 3,
        roomAmenities: ["AC", "TV", "Mini Fridge"]
      }
    ],
    status: "active"
  },
  {
    name: "Bhimtal Lake Front Estate",
    city: "Bhimtal",
    address: "Bhimtal Lake Side, Uttarakhand",
    description: "Quiet and serene estate overlooking the beautiful Bhimtal Lake. Perfect for a relaxing getaway.",
    starRating: 4,
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1605537965004-ca05ff64db9f?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27773.085000969564!2d79.53755378771343!3d29.344400267713583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a38217d85c4b%3A0xe62e0b62d8ea2e0!2sBhimtal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    amenities: ["Free WiFi", "Lake View", "Bonfire", "Restaurant", "Parking"],
    basePricePerNight: 3000,
    rooms: [
      {
        roomType: "Deluxe Lake View",
        pricePerNight: 3000,
        BasicGuestQuantity: 2,
        maxGuests: 4,
        roomImages: ["https://images.unsplash.com/photo-1598928506311-c55d40f95219?w=500&auto=format&fit=crop&q=60"],
        availableRooms: 6,
        roomAmenities: ["TV", "Balcony"]
      }
    ],
    status: "active"
  },
  {
    name: "Mussoorie Clouds End Resort",
    city: "Mussorie",
    address: "Library Road, Mussoorie, Uttarakhand",
    description: "Historic resort situated near Clouds End, offering spectacular views of the Doon Valley and Himalayas.",
    starRating: 5,
    thumbnail: "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54964.88795079456!2d78.03348270543666!3d30.454921935619177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d0cfa61cda5b%3A0x197fd47d980e85b1!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    amenities: ["Free WiFi", "Mountain View", "Spa", "Restaurant", "Parking"],
    basePricePerNight: 5000,
    rooms: [
      {
        roomType: "Himalayan View Suite",
        pricePerNight: 5000,
        BasicGuestQuantity: 2,
        maxGuests: 3,
        roomImages: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60"],
        availableRooms: 4,
        roomAmenities: ["AC", "Heater", "TV", "Mini Fridge"]
      }
    ],
    status: "active"
  },
  {
    name: "Corbett Safari Lodge",
    city: "Jim Corbett",
    address: "Ramnagar, Jim Corbett National Park",
    description: "Experience the thrill of the jungle. Stay right at the edge of the wilderness at our safari lodge.",
    starRating: 4,
    thumbnail: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=60"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111246.732731805!2d79.03310023602167!3d29.387902598858348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a169b00eb820d%3A0x286395dc2dbdc894!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    amenities: ["Safari Booking", "Swimming Pool", "Bonfire", "Restaurant"],
    basePricePerNight: 4500,
    rooms: [
      {
        roomType: "Jungle Tent",
        pricePerNight: 4500,
        BasicGuestQuantity: 2,
        maxGuests: 4,
        roomImages: ["https://images.unsplash.com/photo-1598928506311-c55d40f95219?w=500&auto=format&fit=crop&q=60"],
        availableRooms: 10,
        roomAmenities: ["AC", "Ensuite Bathroom"]
      }
    ],
    status: "active"
  }
];

const seedHotels = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB...");
    
    // Optional: remove previous matching hotels to keep clean
    const names = dummyHotels.map(h => h.name);
    await Hotel.deleteMany({ name: { $in: names } });

    for (const h of dummyHotels) {
      const newHotel = new Hotel(h);
      await newHotel.save();
      console.log(`Successfully added hotel for ${h.city}.`);
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedHotels();
