import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import "./AddHotelForm.css";

const predefinedAmenities = ["WiFi", "Gym", "Parking", "Pool", "Restaurant"];

const EditHotelForm = () => {
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
  
  // Room images state
  const [roomImages, setRoomImages] = useState({});
  const [roomImagePreviews, setRoomImagePreviews] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/user/hotels/details/${id}`,
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

        // Initialize room image previews from existing rooms
        const initialPreviews = {};
        h.rooms?.forEach((room, idx) => {
          initialPreviews[idx] = room.roomImages?.map((url) => ({
            type: "existing",
            url,
          })) || [];
        });
        setRoomImagePreviews(initialPreviews);

        // Initialize empty room images object
        const initialImages = {};
        h.rooms?.forEach((_, idx) => {
          initialImages[idx] = [];
        });
        setRoomImages(initialImages);
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
        `${API_BASE_URL}/api/admin/hotels/${id}/delete-image`,
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

  // Room image handlers
  const handleRoomImageChange = (roomIndex, e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      type: "new",
      url: URL.createObjectURL(file),
    }));

    setRoomImages((prev) => ({
      ...prev,
      [roomIndex]: [...(prev[roomIndex] || []), ...files],
    }));

    setRoomImagePreviews((prev) => ({
      ...prev,
      [roomIndex]: [...(prev[roomIndex] || []), ...previews],
    }));
  };

  const removeRoomImage = (roomIndex, imageIndex) => {
    setRoomImages((prev) => ({
      ...prev,
      [roomIndex]: prev[roomIndex].filter((_, i) => i !== imageIndex),
    }));

    setRoomImagePreviews((prev) => ({
      ...prev,
      [roomIndex]: prev[roomIndex].filter((_, i) => i !== imageIndex),
    }));
  };

  const addRoom = () => {
    setHotel((prev) => {
      const newRoomIndex = prev.rooms.length;
      setRoomImages((r) => ({ ...r, [newRoomIndex]: [] }));
      setRoomImagePreviews((r) => ({ ...r, [newRoomIndex]: [] }));
      return {
        ...prev,
        rooms: [
          ...prev.rooms,
          {
            roomType: "",
            pricePerNight: "",
            BasicGuestQuantity: "",
            ExtraGuestPricePerNight: "",
            DoubleBed: "",
            SingleBed: "",
            maxGuests: "",
            roomAmenities: [],
            availableRooms: "",
          },
        ],
      };
    });
  };

  const removeRoom = (index) => {
    setHotel((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
    // Clean up room images
    setRoomImages((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setRoomImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotel) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      // Basic hotel fields
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

      // Main photo
      if (mainPhoto) formData.append("mainPhoto", mainPhoto);

      // Gallery photos
      gallery.forEach((file) => formData.append("gallery", file));

      // Room images
      let roomIndices = [];
      Object.entries(roomImages).forEach(([roomIndex, files]) => {
        files.forEach((file) => {
          formData.append("roomPhotos", file);
          roomIndices.push(roomIndex);
        });
      });
      if (roomIndices.length > 0) {
        formData.append("roomIndices", JSON.stringify(roomIndices));
      }

      const res = await fetch(`${API_BASE_URL}/api/admin/hotels/${id}`, {
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
            <h4>Room {i + 1}</h4>

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
            
            <label>Basic Guest Quantity:</label>
            <input
              type="number"
              name="BasicGuestQuantity"
              value={room.BasicGuestQuantity || ""}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Basic Guest Quantity"
            />

            <label>Bed:</label>
            <div style={{ display: "flex", gap: "50px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700 }}>Double Bed:</label>
                <input
                  style={{ maxWidth: "320px" }}
                  type="number"
                  name="DoubleBed"
                  value={room.DoubleBed || ""}
                  onChange={(e) => handleRoomChange(i, e)}
                  placeholder="Double Bed"
                />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700 }}>Single Bed:</label>
                <input
                  style={{ maxWidth: "320px" }}
                  type="number"
                  name="SingleBed"
                  value={room.SingleBed || ""}
                  onChange={(e) => handleRoomChange(i, e)}
                  placeholder="Single Bed"
                />
              </div>
            </div>

            <label>Extra Guest Price Per Night:</label>
            <input
              type="number"
              name="ExtraGuestPricePerNight"
              value={room.ExtraGuestPricePerNight || ""}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Extra Guest Price"
            />

            <label>Max Guests:</label>
            <input
              type="number"
              name="maxGuests"
              value={room.maxGuests}
              onChange={(e) => handleRoomChange(i, e)}
              placeholder="Max Guests"
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

            {/* Room Images */}
            <label>Room Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleRoomImageChange(i, e)}
            />
            
            {/* Room Image Gallery */}
            {roomImagePreviews[i] && roomImagePreviews[i].length > 0 && (
              <div className="room-image-gallery">
                {roomImagePreviews[i].map((preview, imgIdx) => (
                  <div key={imgIdx} className="room-image-preview">
                    <img src={preview.url} alt={`Room ${i} Image ${imgIdx}`} />
                    <span className="image-type-badge">{preview.type}</span>
                    <button
                      type="button"
                      className="remove-room-image"
                      onClick={() => removeRoomImage(i, imgIdx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

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

export default EditHotelForm;
