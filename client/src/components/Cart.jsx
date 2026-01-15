import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import HotelCard from "./HotelCard";
import API_BASE_URL from "../config/api";
import "./Cart.css";
const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);

      if (!cartItems || cartItems.length === 0) {
        setHotelsData([]);
        setLoading(false);
        return;
      }

      if (cartItems[0]?.hotelId && typeof cartItems[0].hotelId === "object") {
        setHotelsData(cartItems);
        setLoading(false);
        return;
      }

      try {
        const promises = cartItems.map((item) => {
          const id = item._id || item.hotelId || item.id;
          return fetch(`${API_BASE_URL}/api/user/hotels/${id}`).then((res) => {
            if (!res.ok) throw new Error("Hotel not found");
            return res.json();
          });
        });

        const data = await Promise.all(promises);
        const normalizedData = data.map((d) => d.hotel || d);
        setHotelsData(normalizedData);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setHotelsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [cartItems]);

  const getHotelId = (hotel) =>
    hotel._id || hotel.id || (hotel.hotelId && hotel.hotelId._id);

  return (
<div className="cart-list">
  {hotelsData.map((hotel, index) => (
    <div key={hotel._id || index} className="cart-item">
      
      <div className="cart-header">
        <button
          onClick={() => removeFromCart(getHotelId(hotel))}
          className="remove-btn"
        >
          Remove
        </button>
      </div>

      <div className="cart-card-wrapper">
        <HotelCard hotel={hotel} />
      </div>

    </div>
  ))}
</div>



  );
};

export default Cart;
