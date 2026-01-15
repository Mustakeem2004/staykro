import { createContext, useState, useEffect } from "react";
import API_BASE_URL from "../config/api";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // ✅ Initialize from localStorage
  const [city, setCity] = useState(() => localStorage.getItem("city") || "");
  const [people, setPeople] = useState(() => Number(localStorage.getItem("people")) || 1);
  const [checkIn, setCheckIn] = useState(() => localStorage.getItem("checkIn") || "");
  const [checkOut, setCheckOut] = useState(() => localStorage.getItem("checkOut") || "");
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });
  

  // ✅ Save changes to localStorage automatically
  useEffect(() => localStorage.setItem("city", city), [city]);
  useEffect(() => localStorage.setItem("people", people), [people]);
  useEffect(() => localStorage.setItem("checkIn", checkIn), [checkIn]);
  useEffect(() => localStorage.setItem("checkOut", checkOut), [checkOut]);
  useEffect(() => localStorage.setItem("bookings", JSON.stringify(bookings)), [bookings]);

  return (
    <SearchContext.Provider
      value={{
        city,
        setCity,
        people,
        setPeople,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        bookings,
        setBookings,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

