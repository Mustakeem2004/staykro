import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import "./AddHotelForm.css";
import { HotelContext } from "../../context/HotelContext";

const predefinedAmenities = ["WiFi", "Gym", "Parking", "Pool", "Restaurant"];

const SuperAdminAddHotelForm = () => {
  const { setHasHotel } = useContext(HotelContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const mainPhotoInputRef = useRef(null); 
    const galleryInputRef = useRef(null);
    const mapInputRef = useRef(null);
  
    // ✅ Redirect if not admin
    useEffect(() => {
      if (!user || user.role !== "superadmin") {
        alert("⚠️ Only admins can add hotels. Please log in as an admin.");
        navigate("/login");
      }
    }, [user, navigate]);
  
    const [hotelData, setHotelData] = useState({
      name: "",
      city: "",
      address: "",
      description: "",
      starRating: "",
      mapEmbedUrl: "",
      amenities: [],
      customAmenities: "",
      policies: {
        checkInTime: "",
        checkOutTime: "",
        cancellationPolicy: "",
        ageRestriction: "",
      },
      basePricePerNight: "",
      rooms: [], // ✅ Empty initially (hidden)
    });
  
    const [mainPhotoPreview, setMainPhotoPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [mainPhoto, setMainPhoto] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    // ----------------------------
    // Handlers
    // ----------------------------
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith("policies.")) {
        setHotelData((prev) => ({
          ...prev,
          policies: { ...prev.policies, [name.split(".")[1]]: value },
        }));
      } else {
        setHotelData((prev) => ({ ...prev, [name]: value }));
      }
    };
  
    const handleAmenityToggle = (amenity) => {
      setHotelData((prev) => {
        if (prev.amenities.includes(amenity)) {
          return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) };
        } else {
          return { ...prev, amenities: [...prev.amenities, amenity] };
        }
      });
    };
  
    // ----------------------------
    // Image Upload Handlers
    // ----------------------------
    const handleMainPhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMainPhoto(file);
        setMainPhotoPreview(URL.createObjectURL(file));
      }
    };
  
    const handleGalleryChange = (e) => {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setGallery((prev) => [...prev, ...files]);
      setGalleryPreviews((prev) => [...prev, ...previews]);
    };
  
    const removeMainPhoto = () => {
      setMainPhoto(null);
      setMainPhotoPreview(null);
      if (mainPhotoInputRef.current) mainPhotoInputRef.current.value = "";
    };
  
    const removeGalleryPhoto = (index) => {
      const newGallery = gallery.filter((_, i) => i !== index);
      const newPreviews = galleryPreviews.filter((_, i) => i !== index);
      setGallery(newGallery);
      setGalleryPreviews(newPreviews);
      if (galleryInputRef.current && newGallery.length === 0)
        galleryInputRef.current.value = "";
    };
  
    // ----------------------------
    // Room Handlers
    // ----------------------------
    const handleRoomChange = (index, e) => {
      const { name, value } = e.target;
      const roomsCopy = [...hotelData.rooms];
      if (name === "roomAmenities") {
        roomsCopy[index][name] = value.split(",").map((a) => a.trim());
      } else {
        roomsCopy[index][name] = value;
      }
      setHotelData((prev) => ({ ...prev, rooms: roomsCopy }));
    };
  
    const addRoom = () => {
      setHotelData((prev) => ({
        ...prev,
        rooms: [
          ...prev.rooms,
          {
            roomType: "",
            pricePerNight: "",
            maxGuests: "",
            beds: "",
            availableRooms: "",
            roomAmenities: [],
          },
        ],
      }));
    };
  
    const removeRoom = (index) => {
      const roomsCopy = [...hotelData.rooms];
      roomsCopy.splice(index, 1);
      setHotelData((prev) => ({ ...prev, rooms: roomsCopy }));
    };
  
    // ----------------------------
    // Handle Map Embed
    // ----------------------------
    const handleMapEmbedChange = (e) => {
      let value = e.target.value;
      const match = value.match(/src\s*=\s*"([^"]+)"/);
      if (match) value = match[1];
      setHotelData((prev) => ({ ...prev, mapEmbedUrl: value }));
    };
  
    // ----------------------------
    // Submit Handler
    // ----------------------------
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      const { name, city, address, mapEmbedUrl, policies, basePricePerNight, starRating } = hotelData;
  
      if (
        !name.trim() ||
        !city.trim() ||
        !address.trim() ||
        !mapEmbedUrl.trim() ||
        !policies.checkInTime ||
        !policies.checkOutTime ||
        !basePricePerNight
      ) {
        alert("⚠️ Please fill all mandatory fields before submitting.");
        return;
      }
  
      if (!mainPhoto) {
        alert("⚠️ Please upload a main photo.");
        mainPhotoInputRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
  
      if (gallery.length === 0) {
        alert("⚠️ Please upload at least one gallery photo.");
        galleryInputRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
  
      if (starRating < 1 || starRating > 5) {
        alert("⭐ Star rating must be between 1 and 5.");
        return;
      }
  
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", hotelData.name);
        formData.append("city", hotelData.city);
        formData.append("address", hotelData.address);
        formData.append("description", hotelData.description);
        formData.append("starRating", hotelData.starRating);
        formData.append("mapEmbedUrl", hotelData.mapEmbedUrl);
        formData.append("basePricePerNight", hotelData.basePricePerNight);
  
        formData.append(
          "amenities",
          JSON.stringify([
            ...hotelData.amenities,
            ...hotelData.customAmenities
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean),
          ])
        );
  
        formData.append("policies", JSON.stringify(hotelData.policies));
        formData.append("rooms", JSON.stringify(hotelData.rooms));
  
        if (mainPhoto) formData.append("mainPhoto", mainPhoto);
        gallery.forEach((file) => formData.append("gallery", file));
  
        const res = await fetch(`${API_BASE_URL}/api/admin/hotels`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to add hotel");
  
        alert("✅ Hotel added successfully!");
        window.dispatchEvent(new Event("hotelAdded"));
        setHasHotel(true);
        navigate("/admin");
      } catch (err) {
        console.error(err);
        setError(err.message);
        alert(`❌ Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
  
  
  
  
  
    // ----------------------------
    // JSX
    // ----------------------------
    return (
      <div className="addHotelFormContainer">
        <h2>Add New Hotel</h2>
        {error && <p className="error">{error}</p>}
  
        <form onSubmit={handleSubmit} className="addHotelForm">
          <label>Hotel Name:<span className="required">*</span></label>
          <input name="name" value={hotelData.name} onChange={handleChange} required />
  
          <label>City:<span className="required">*</span></label>
          <input name="city" value={hotelData.city} onChange={handleChange} required />
  
          <label>Address:<span className="required">*</span></label>
          <input name="address" value={hotelData.address} onChange={handleChange} required />
  
          <label>Description:</label>
          <textarea name="description" value={hotelData.description} onChange={handleChange} />
  
          <label>Star Rating (1–5):<span className="required">*</span></label>
          <input
            type="number"
            name="starRating"
            value={hotelData.starRating}
            onChange={(e) =>
              setHotelData((prev) => ({ ...prev, starRating: e.target.value }))
            }
            min="1"
            max="5"
            step="0.1"
            placeholder="e.g. 4.5"
            required
          />
  
          <label>Base Price Per Night:<span className="required">*</span></label>
          <input
            type="number"
            name="basePricePerNight"
            value={hotelData.basePricePerNight}
            onChange={handleChange}
            min="100"
            required
          />
  
          {/* Google Map Embed */}
          <h3>Google Maps Embed Instructions:</h3>
          <ul className="map-instructions">
            <li>1️⃣ Go to <a href="https://maps.google.com" target="_blank" rel="noreferrer">Google Maps</a>.</li>
            <li>2️⃣ Search your hotel location.</li>
            <li>3️⃣ Click “Share” → “Embed a map”.</li>
            <li>4️⃣ Copy the full iframe code.</li>
            <li>5️⃣ Paste below 👇 — system extracts the URL.</li>
          </ul>
  
          <label>Google Maps Embed Code:<span className="required">*</span></label>
          <textarea
            name="mapEmbedUrl"
            value={hotelData.mapEmbedUrl}
            onChange={handleMapEmbedChange}
            placeholder='Paste full iframe code here'
            ref={mapInputRef}
            required
          />
  
          {hotelData.mapEmbedUrl && (
            <div className="map-preview">
              <iframe
                src={hotelData.mapEmbedUrl}
                width="100%"
                height="250"
                style={{ border: "0", borderRadius: "10px", marginTop: "10px" }}
                allowFullScreen=""
                loading="lazy"
                title="Map Preview"
              ></iframe>
            </div>
          )}
  
          {/* Amenities */}
          <h3>Amenities</h3>
          <div className="amenitiesCheckboxes">
            {predefinedAmenities.map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  checked={hotelData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
  
          <label>Custom Amenities (comma separated):</label>
          <input
            name="customAmenities"
            value={hotelData.customAmenities}
            onChange={handleChange}
            placeholder="e.g., Breakfast, Shuttle"
          />
  
          {/* Policies */}
          <h3>Hotel Policies</h3>
          <label>Check-In Time:<span className="required">*</span></label>
          <input
            type="time"
            name="policies.checkInTime"
            value={hotelData.policies.checkInTime}
            onChange={handleChange}
            required
          />
  
          <label>Check-Out Time:<span className="required">*</span></label>
          <input
            type="time"
            name="policies.checkOutTime"
            value={hotelData.policies.checkOutTime}
            onChange={handleChange}
            required
          />
  
          <label>Cancellation Policy:</label>
          <input
            name="policies.cancellationPolicy"
            value={hotelData.policies.cancellationPolicy}
            onChange={handleChange}
          />
  
          <label>Age Restriction:</label>
          <input
            name="policies.ageRestriction"
            value={hotelData.policies.ageRestriction}
            onChange={handleChange}
          />
  
          {/* Rooms Section */}
          <h3>Rooms</h3>
          {hotelData.rooms.length > 0 ? (
            hotelData.rooms.map((room, index) => (
              <div key={index} className="room-section">
                <h4>Room {index + 1}</h4>
  
                <label>
                  Room Type:<span className="required">*</span>
                </label>
                <input
                  name="roomType"
                  value={room.roomType}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="e.g., Deluxe Room"
                  required
                />
  
                <label>
                  Price Per Night:<span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={room.pricePerNight}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="e.g., 2000"
                  required
                />
  
                <label>
                  Max Guests:<span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="maxGuests"
                  value={room.maxGuests}
                  onChange={(e) => handleRoomChange(index, e)}
                  required
                />
  
                <label>
                  Beds:<span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="beds"
                  value={room.beds}
                  onChange={(e) => handleRoomChange(index, e)}
                  required
                />
  
                <label>
                  Available Rooms:<span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="availableRooms"
                  value={room.availableRooms}
                  onChange={(e) => handleRoomChange(index, e)}
                  required
                />
  
                <label>Room Amenities (comma separated):</label>
                <input
                  name="roomAmenities"
                  value={room.roomAmenities.join(", ")}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="e.g., AC, TV, WiFi"
                />
  
                <button
                  type="button"
                  className="remove-room-btn"
                  onClick={() => removeRoom(index)}
                >
                  ❌ Remove Room
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "gray" }}>No rooms added yet.</p>
          )}
  
          <button type="button" className="add-room-btn" onClick={addRoom}>
            ➕ Add Room
          </button>
  
          {/* Images */}
          <h3>Upload Photos</h3>
          <label>Main Photo:<span className="required">*</span></label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainPhotoChange}
            ref={mainPhotoInputRef}
            required
          />
          {mainPhotoPreview && (
            <div className="image-preview">
              <img src={mainPhotoPreview} alt="Main Preview" />
              <button type="button" onClick={removeMainPhoto}>×</button>
            </div>
          )}
  
          <label>Gallery Photos:<span className="required">*</span></label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryChange}
            ref={galleryInputRef}
          />
          <div className="gallery-preview">
            {galleryPreviews.map((preview, idx) => (
              <div key={idx} className="image-preview">
                <img src={preview} alt={`Gallery ${idx}`} />
                <button type="button" onClick={() => removeGalleryPhoto(idx)}>×</button>
              </div>
            ))}
          </div>
  
          <button type="submit" disabled={loading}>
            {loading ? "Adding Hotel..." : "Add Hotel"}
          </button>
        </form>
      </div>
    );
  };

export default SuperAdminAddHotelForm;


















