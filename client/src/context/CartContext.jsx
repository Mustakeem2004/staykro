import React, { createContext, useContext, useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = `${API_BASE_URL}/api/cart`;

  // 🧠 Load or Merge Cart when user changes
  useEffect(() => {
    const fetchAndMergeCart = async () => {
      try {
        // ===============================
        // 🧩 1️⃣ Guest Mode
        // ===============================
        if (!userId) {
          const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          if (localCart.length === 0) {
            setCartItems([]);
            return;
          }

          try {
            const hotelDetails = await Promise.all(
              localCart.map(async (item) => {
                try {
                  const res = await fetch(
                    `${API_BASE_URL}/api/user/hotels/${item._id}`
                  );
                  if (!res.ok) throw new Error("Hotel not found");
                  const data = await res.json();
                  return data.hotel || data;
                } catch (err) {
                  console.error("Error fetching hotel details:", err);
                  return null;
                }
              })
            );

            // Filter out failed fetches (null)
            setCartItems(hotelDetails.filter(Boolean));
          } catch (err) {
            console.error("Error loading guest cart:", err);
            setCartItems([]);
          }

          return; // stop here for guest users
        }

        // ===============================
        // 🧩 2️⃣ Logged-in Mode
        // ===============================
        const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];

        if (localCart.length > 0) {
          // Merge guest cart with user cart
          const mergeRes = await fetch(`${BASE_URL}/merge`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ localCart }),
            credentials: "include",
          });

          if (!mergeRes.ok) throw new Error("Failed to merge cart");

          const mergedData = await mergeRes.json();

          // ✅ Extract only hotel objects from merged cart
          const hotels = mergedData.map((item) => item.hotelId);
          setCartItems(hotels);

          // Clear guest cart from localStorage
          localStorage.removeItem("guestCart");
        } else {
          // 🧭 Fetch existing cart for logged-in user
          const res = await fetch(`${BASE_URL}/${userId}`, {
            credentials: "include",
          });

          if (!res.ok) throw new Error("Failed to fetch cart");

          const data = await res.json();
          const hotels = data.map((item) => item.hotelId);
          setCartItems(hotels);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchAndMergeCart();
  }, [userId]);

  // ➕ Add to Cart
  const addToCart = async (hotelId) => {
    // ===============================
    // 🧩 Guest Mode
    // ===============================
    if (!userId) {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      if (!localCart.find((item) => item._id === hotelId)) {
        localCart.push({ _id: hotelId });
        localStorage.setItem("guestCart", JSON.stringify(localCart));

        try {
          const res = await fetch(
            `${API_BASE_URL}/api/user/hotels/${hotelId}`
          );
          if (!res.ok) throw new Error("Hotel not found");
          const data = await res.json();
          setCartItems((prev) => [...prev, data.hotel]);
        } catch (err) {
          console.error("Error fetching hotel details:", err);
        }

        alert("Added to cart (Guest Mode)");
      } else {
        alert("Already in cart");
      }
      return;
    }

    // ===============================
    // 🧩 Logged-in Mode
    // ===============================
    try {
      const res = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, hotelId }),
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Extract hotel list
      const hotels = data.map((item) => item.hotelId);
      setCartItems(hotels);

      alert("Hotel added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // 🗑 Remove from Cart
  const removeFromCart = async (hotelId) => {
    // ===============================
    // 🧩 Guest Mode
    // ===============================
    if (!userId) {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updatedCart = localCart.filter((item) => item._id !== hotelId);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCartItems((prev) => prev.filter((h) => h._id !== hotelId));
      return;
    }

    // ===============================
    // 🧩 Logged-in Mode
    // ===============================
    try {
      const res = await fetch(`${BASE_URL}/remove/${userId}/${hotelId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Extract only hotel list from updated cart
      const hotels = data.map((item) => item.hotelId);
      setCartItems(hotels);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // 🧹 Clear Cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("guestCart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


