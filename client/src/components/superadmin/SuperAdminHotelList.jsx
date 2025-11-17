import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminHotelCard from "./SuperAdminHotelCard";

const SuperAdminHotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://staykro-backend.onrender.com/api/superadmin/hotels`, {
        credentials: "include", // if using auth cookies
      });
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(data.hotels || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      const res = await fetch(`https://staykro-backend.onrender.com/api/superadmin/hotels/${hotelId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete hotel");
      fetchHotels(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (hotel) => {
    navigate(`/superadmin/edit-hotel/${hotel._id}`, { state: { hotel } });
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      <h1>All Hotels</h1>
      {hotels.length === 0 ? <p>No hotels found</p> : hotels.map(hotel => (
        <SuperAdminHotelCard key={hotel._id} hotel={hotel} onEdit={handleEdit} onDelete={handleDelete} />

      ))}
    </div>
  );
};

export default SuperAdminHotelList;



