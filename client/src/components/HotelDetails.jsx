import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HotelGallery from "./HotelGallery";
import SearchBar from "./SearchBar";
import { CartContext } from "../context/CartContext";
import { HotelContext } from "../context/HotelContext";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import "./HotelDetails.css";
import RoomImageModal from "./admin/RoomImageModal";
import API_BASE_URL from "../config/api";
import { toast } from 'react-toastify';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cache, saveHotelsToCache } = useContext(HotelContext);
  const { addToCart } = useContext(CartContext);
  const { checkIn, checkOut } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

const [hotel, setHotel] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [selectedRoom, setSelectedRoom] = useState(null); // <-- ADD THIS


  // ✅ Fetch hotel details
  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/user/hotels/details/${id}`);
      if (!res.ok) throw new Error("Hotel not found");

      const data = await res.json();
      const hotelData = data.hotel || data.data || data;

      const formattedHotel = {
        id: hotelData._id,
        hotelName: hotelData.name || "Unnamed Hotel",
        address: hotelData.address || "No address available",
        city: hotelData.city || "Unknown City",
        description: hotelData.description || "",
        amenities: hotelData.amenities || [],
        rating: hotelData.starRating || 0,
        pricePerNight:
          hotelData.basePricePerNight ||
          hotelData.rooms?.[0]?.pricePerNight ||
          0,
        image: hotelData.thumbnail || hotelData.mainPhoto || "",
        images: hotelData.images || [],
        rooms: hotelData.rooms || [],
        policies: hotelData.policies || null,
        mapEmbedUrl: hotelData.mapEmbedUrl || "",
      };
      

      setHotel(formattedHotel);

      // ✅ Cache update
      const cachedHotels = cache[formattedHotel.city];
      if (cachedHotels && Array.isArray(cachedHotels)) {
        saveHotelsToCache(formattedHotel.city, [...cachedHotels, formattedHotel]);
      } else {
        saveHotelsToCache(formattedHotel.city, [formattedHotel]);
      }
    } catch (err) {
      console.error("Error fetching hotel details:", err);
      setError("Failed to fetch hotel details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchHotelDetails();
  }, [id]);

  // ✅ Loading / error states
  if (loading) return <p className="loading">Loading hotel details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!hotel) return <p className="error">Hotel not found.</p>;

// ✅ Handle photos (thumbnail first, then gallery images)
const galleryPhotos = [];

// 1️⃣ Add thumbnail first (if available)
if (hotel.image) {
  galleryPhotos.push({ url: hotel.image });
}

// 2️⃣ Add gallery images (excluding thumbnail if it’s also in the list)
if (hotel.images && hotel.images.length > 0) {
  const formattedImages = hotel.images
    .filter((url) => url !== hotel.image) // prevent duplicate
    .map((url) => ({
      url: url.startsWith("http") ? url : `${API_BASE_URL}/${url}`,
    }));

  galleryPhotos.push(...formattedImages);
}


  // ✅ Handle Booking
  const handlePayment = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates first.");
      return;
    }
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/payment/${hotel.id}`);
    }
  };

  return (
    <div className="hotel-details-container">
      {/* ✅ Gallery Section */}
      {galleryPhotos.length > 0 && <HotelGallery photos={galleryPhotos} />}

      <div className="hotel-details-content">
        {/* ✅ Header Section */}
        <div className="hotel-section header-section">
          <div className="hotel-info">
            <h1 className="hotel-name">{hotel.hotelName}</h1>
            <p className="hotel-address">
              <strong>Address:</strong> {hotel.address}
            </p>
            <p className="hotel-rating">⭐ {hotel.rating}</p>
          </div>

          <div className="hotel-price">
            <h2>₹{hotel.pricePerNight} / night</h2>
            <button className="addtocart" onClick={() => addToCart(hotel.id)}>
              🛒 Add to Cart
            </button>
          </div>
        </div>

        {/* ✅ About Section */}
        <div className="hotel-section">
          <h2>About this Hotel</h2>
          <p>
            {hotel.description ||
              "This property offers comfortable rooms, great amenities, and a convenient location. Perfect for family vacations, couples, and business travelers."}
          </p>
        </div>

        {/* ✅ Amenities Section */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="hotel-section">
            <h2>Amenities</h2>
            <ul className="amenities">
              {hotel.amenities.map((amenity, i) => (
                <li key={i}>✔ {amenity}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Policies Section (only if available) */}
        {hotel.policies && Object.keys(hotel.policies).length > 0 && (
          <div className="hotel-section">
            <h2>Hotel Policies</h2>
            <ul className="policies-list">
              {hotel.policies.checkInTime && (
                <li>
                  🕒 <strong>Check-In Time:</strong> {hotel.policies.checkInTime}
                </li>
              )}
              {hotel.policies.checkOutTime && (
                <li>
                  🕕 <strong>Check-Out Time:</strong> {hotel.policies.checkOutTime}
                </li>
              )}
              {hotel.policies.cancellationPolicy && (
                <li>
                  ❌ <strong>Cancellation Policy:</strong>{" "}
                  {hotel.policies.cancellationPolicy}
                </li>
              )}
              {hotel.policies.ageRestriction && (
                <li>
                  👤 <strong>Age Restriction:</strong>{" "}
                  {hotel.policies.ageRestriction}
                </li>
              )}
            </ul>
          </div>
        )}

{/* ✅ Rooms Section (only if available) */}
{hotel.rooms && hotel.rooms.length > 0 && (
  <div className="hotel-section">
    <h2>Available Rooms</h2>

    <div className="rooms-grid">
      {hotel.rooms.map((room, index) => (
        <div key={index} className="room-card">
          <div className="room-info">

            {/* Room Image + View All */}
            <div>
              <img
                className="roomImages"
                src={room.roomImages?.[0]}
                alt="Room"
              />

              {room.roomImages &&
                room.roomImages.length > 1 && (
                  <button
                    className="view-all-btn"
                    onClick={() =>
                      setSelectedRoom({
                        roomType: room.roomType,
                        images: room.roomImages,
                      })
                    }
                  >
                    View all images ({room.roomImages.length})
                  </button>
                )}
            </div>

            <h3>{room.roomType}</h3>
            <p>
              <strong>₹{room.pricePerNight}</strong> / night
            </p>
            <p>
              🛏️ {room.beds} Beds • 👥 Max Guests: {room.maxGuests}
            </p>
            <p>🏠 Available: {room.availableRooms}</p>

            {room.roomAmenities && room.roomAmenities.length > 0 && (
              <ul className="room-amenities">
                {room.roomAmenities.map((amenity, i) => (
                  <li key={i}>• {amenity}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Book Button */}
          <div className="room-actions">
            <button
              className="room-book-btn"
              onClick={() => handlePayment(room._id)}
            >
              Book This Room
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Modal */}
    {selectedRoom && (
      <RoomImageModal
        images={selectedRoom.images}
        roomType={selectedRoom.roomType}
        onClose={() => setSelectedRoom(null)}
      />
    )}
  </div>
)}




        {/* ✅ Map Section */}
        <div className="hotel-section map-section">
          <h2>Location</h2>
          {hotel.mapEmbedUrl ? (
            <div className="map-container">
              <iframe
                src={hotel.mapEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                loading="lazy"
                title="Hotel Location"
              ></iframe>
            </div>
          ) : (
            <p>Map not available for this hotel.</p>
          )}
        </div>

        {/* ✅ Book Now Section */}
        <div className="book-now">
          <button className="book-button" onClick={handlePayment}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;








