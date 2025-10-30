import React, { useEffect, useState } from "react";
import AdminHotelCard from "./AdminHotelCard";
import { useNavigate } from "react-router-dom";
import HotelCard from "../HotelCard";
import {AuthContext} from "../../context/AuthContext";
import { useContext } from "react";

const AdminHotelList = () => {
  const {user}=useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const fetchHotels = async () => {
    if (!user?._id) return;

    

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/admin/hotels/${user._id}`, {
        credentials: "include", // if using auth cookies
      });
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(data.hotels || []);
    } catch (err) {
      // setError(err.message);
      console.error(err.message);
      
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (hotelId) => {
  if (!window.confirm("Are you sure you want to delete this hotel?")) return;

  try {
    const res = await fetch(`http://localhost:3000/api/admin/hotels/${hotelId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete hotel");

    // ✅ Remove deleted hotel from state instantly
    setHotels((prev) => prev.filter((hotel) => hotel._id !== hotelId));

    window.dispatchEvent(new Event("hotelDeleted"));
  } catch (err) {
    alert(err.message);
  }
};


  const handleEdit = (hotel) => {
    navigate(`/admin/edit-hotel/${hotel._id}`, { state: { hotel } });
  };

useEffect(() => {
  if (user?._id) {
    fetchHotels();
  }
}, [user]); // Add user as dependency


  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" ,height:"100vh"}}>
      <h1>My Hotels</h1>
      {hotels.length === 0 ? <p>No hotels found</p> : hotels.map(hotel => (
        <AdminHotelCard key={hotel._id} hotel={hotel} onEdit={handleEdit} onDelete={handleDelete} />

      ))}
    </div>
  );
};

export default AdminHotelList;



