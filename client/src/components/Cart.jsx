import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import HotelCard from "./HotelCard";
import API_BASE_URL from "../config/api";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);

      // 🧩 Case 1: Empty Cart
      if (!cartItems || cartItems.length === 0) {
        setHotelsData([]);
        setLoading(false);
        return;
      }
      

      // 🧩 Case 2: Logged-in user — already have full hotel objects
      // Example: cartItems = [{ _id: "h1", name: "Taj" }, ...]
      if (cartItems[0]?.hotelId && typeof cartItems[0].hotelId === "object") {
        
        setHotelsData(cartItems);
        setLoading(false);
        return;
      }

      // 🧩 Case 3: Guest user — only have IDs → fetch hotel details
      try {
        const promises = cartItems.map((item) => {
          const id = item._id || item.hotelId || item.id;
          return fetch(`${API_BASE_URL}/api/user/hotels/${id}`).then(
            (res) => {
              if (!res.ok) throw new Error("Hotel not found");
              return res.json();
            }
          );
        });

        const data = await Promise.all(promises);
       
        

        // Normalize data (API might return {hotel: {...}} or {...})
        const normalizedData = data.map((d) => d.hotel || d);
        
        setHotelsData(normalizedData);
      } catch (err) {
        console.error("❌ Error fetching hotel details:", err);
        setHotelsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [cartItems]);

  // 🧩 Helper to get consistent hotel ID (for removeFromCart)
  const getHotelId = (hotel) =>
  hotel._id || hotel.id || (hotel.hotelId && hotel.hotelId._id);
    


  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <h1>🛒 Your Cart</h1>

      {loading && <p>Loading your cart...</p>}

      {!loading && hotelsData.length === 0 && (
        <p style={{ marginTop: "20px" }}>No hotels added yet.</p>
      )}

      {!loading &&
        hotelsData.map((hotel, index) => (
          <div
            key={hotel._id || index}
            style={{
              position: "relative",
              width: "1000px",
              marginBottom: "20px",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <HotelCard hotel={hotel} />

            <button
              onClick={() => removeFromCart(getHotelId(hotel))}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default Cart;
