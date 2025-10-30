import React, { useState, useEffect ,useRef} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const predefinedAmenities = ["WiFi", "Gym", "Parking", "Pool", "Restaurant"];

const SuperAdminEditHotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mainPhotoInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [hotel, setHotel] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [mainPhotoPreview, setMainPhotoPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]); // old gallery images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/user/hotels/details/${id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch hotel");

        const h = data.hotel;
        setHotel({
          ...h,
          amenities: h.amenities || [],
          coordinates: h.coordinates || { lat: "", lng: "" },
          policies: h.policies || {
            checkInTime: "",
            checkOutTime: "",
            cancellationPolicy: "",
            ageRestriction: "",
          },
          rooms: h.rooms || [],
          customAmenities: "",
        });
        setMainPhotoPreview(h.thumbnail);
        setExistingGallery(h.images || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHotel();
  }, [id]);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("coordinates.")) {
      setHotel((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name.split(".")[1]]: value },
      }));
    } else if (name.startsWith("policies.")) {
      setHotel((prev) => ({
        ...prev,
        policies: { ...prev.policies, [name.split(".")[1]]: value },
      }));
    } else {
      setHotel((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Amenity toggle
  const handleAmenityToggle = (amenity) => {
    setHotel((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  // File inputs
  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainPhoto(file);
      setMainPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setGalleryPreviews((prev) => [...prev, ...previews]);
  };

  // Remove newly added gallery image
  const removeGalleryPhoto = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete an existing image (from DB)
  const handleDeleteExistingImage = async (imageUrl) => {
    if (!window.confirm("❌ Delete this image permanently?")) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/hotels/${id}/delete-image`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ imageUrl }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete image");
      alert("🗑️ Image deleted successfully");
      setExistingGallery((prev) => prev.filter((url) => url !== imageUrl));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Rooms
  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRooms = [...hotel.rooms];
    if (name === "roomAmenities") {
      updatedRooms[index][name] = value.split(",").map((a) => a.trim());
    } else {
      updatedRooms[index][name] = value;
    }
    setHotel((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  const addRoom = () => {
    setHotel((prev) => ({
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
    setHotel((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotel) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      Object.entries(hotel).forEach(([key, val]) => {
        if (["coordinates", "policies", "rooms"].includes(key)) {
          formData.append(key, JSON.stringify(val));
        } else if (key === "amenities") {
          const combined = [
            ...val,
            ...(hotel.customAmenities
              ? hotel.customAmenities.split(",").map((a) => a.trim())
              : []),
          ].filter(Boolean);
          formData.append("amenities", JSON.stringify(combined));
        } else if (!["customAmenities"].includes(key)) {
          formData.append(key, val);
        }
      });

      if (mainPhoto) formData.append("mainPhoto", mainPhoto);
      gallery.forEach((file) => formData.append("gallery", file));

      const res = await fetch(`http://localhost:3000/api/admin/hotels/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update hotel");

      alert("✅ Hotel updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.message);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return <p>Loading hotel data...</p>;

  return (
    <div className="addHotelFormContainer">
      <h2>Edit Hotel</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="addHotelForm">
        <label>Hotel Name:</label>
        <input name="name" value={hotel.name} onChange={handleChange} required />

        <label>City:</label>
        <input name="city" value={hotel.city} onChange={handleChange} required />

        <label>Address:</label>
        <input name="address" value={hotel.address} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={hotel.description} onChange={handleChange} />


        <label>Star Rating (1–5)</label>
        <input
          type="number"
          name="starRating"
          value={hotel.starRating}
          onChange={(e) =>
            setHotel((prev) => ({ ...prev, starRating: e.target.value }))
          }
          // onChange={handleChange}
          min="1"
          max="5"
          step="0.1"
          placeholder="e.g. 4.5"
          required
        />


{/* Amenities */}
<h3>Amenities</h3>
<div className="amenitiesCheckboxes">
  {[
    ...new Set([
      ...predefinedAmenities,
      ...(hotel.amenities || []),
    ]),
  ].map((a) => (
    <label key={a}>
      <input
        type="checkbox"
        checked={hotel.amenities.includes(a)}
        onChange={() => handleAmenityToggle(a)}
      />
      {a}
    </label>
  ))}
</div>

{/* Custom Amenities Input */}
<input
  name="customAmenities"
  value={hotel.customAmenities}
  onChange={handleChange}
  placeholder="Add custom amenities (comma separated)"
/>
        {/* Policies */}
        <h3>Hotel Policies</h3>
        <label>Check-In Time:</label>
        <input
          type="time"
          name="policies.checkInTime"
          value={hotel.policies.checkInTime}
          onChange={handleChange}
        />
        <label>Check-Out Time:</label>
        <input
          type="time"
          name="policies.checkOutTime"
          value={hotel.policies.checkOutTime}
          onChange={handleChange}
        />
        <label>Cancellation Policy:</label>
        <input
          name="policies.cancellationPolicy"
          value={hotel.policies.cancellationPolicy}
          onChange={handleChange}
          placeholder="Cancellation Policy"
        />
        <label>Age Restriction:</label>
        <input
          name="policies.ageRestriction"
          value={hotel.policies.ageRestriction}
          onChange={handleChange}
          placeholder="Age Restriction"
        />

        {/* Rooms */}
        <h3>Rooms</h3>
        {hotel.rooms.map((room, i) => (
          <div key={i} className="room-section">
            <label>Room Type:</label>
            <input
              name="roomType"
              value={room.roomType}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Room Type"
            />
            <label>Price per Night:</label>
            <input
              type="number"
              name="pricePerNight"
              value={room.pricePerNight}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Price"
            />
            <label>Max Guests:</label>
            <input
              type="number"
              name="maxGuests"
              value={room.maxGuests}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Max Guests"
            />
            <label>Beds:</label>
            <input
              type="number"
              name="beds"
              value={room.beds}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Beds"
            />
            <label>Available Rooms:</label>
            <input
              type="number"
              name="availableRooms"
              value={room.availableRooms}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Available Rooms"
            />
            <label>Room Amenities (comma separated):</label>
            <input
              name="roomAmenities"
              value={room.roomAmenities.join(", ")}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Room Amenities (comma separated)"
            />
            <button type="button" onClick={() => removeRoom(i)}>
              ❌ Remove Room
            </button>
          </div>
        ))}
        <button type="button" onClick={addRoom}>
          ➕ Add Room
        </button>

        {/* Photos */}
        <h3>Photos</h3>
        <label>Main Photo:</label>
        <input type="file" accept="image/*" onChange={handleMainPhotoChange} ref={mainPhotoInputRef} />
        {mainPhotoPreview && (
          <div className="image-preview">
            <img src={mainPhotoPreview} alt="Main" />
          </div>
        )}

        {/* Existing gallery */}
        <h4>Existing Gallery Images</h4>
        <div className="gallery-preview">
          {existingGallery.length > 0 ? (
            existingGallery.map((url, idx) => (
              <div key={idx} className="image-preview">
                <img src={url} alt={`Existing ${idx}`} />
                <button type="button" onClick={() => handleDeleteExistingImage(url)}>x </button>
              </div>
            ))
          ) : (
            <p>No existing images</p>
          )}
        </div>

        {/* New gallery */}
        <label>Add New Gallery Photos:</label>
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
              <img src={preview} alt={`New ${idx}`} />
              <button type="button" onClick={() => removeGalleryPhoto(idx)}>×</button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Hotel"}
        </button>
      </form>
    </div>
  );
};

export default SuperAdminEditHotelForm;
