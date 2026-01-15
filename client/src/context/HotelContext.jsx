import React, { createContext, useState, useContext } from "react";
import API_BASE_URL from "../config/api";
export const HotelContext = createContext();

// export const useHotelCache = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
  const [cache, setCache] = useState({}); 
  const [hasHotel, setHasHotel] = useState(false);

  // structure: { cityName: { hotels: [], nextPageToken: "" } }

  const saveHotelsToCache = (city, hotels) => {
    setCache((prev) => ({
      ...prev,
      [city]: hotels,
    }));
    
    
  };

  return (
    <HotelContext.Provider value={{ cache, saveHotelsToCache , hasHotel, setHasHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
