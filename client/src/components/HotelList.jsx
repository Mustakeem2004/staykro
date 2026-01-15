import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Filters from "./Filters";
import HotelCard from "./HotelCard";
import SearchBar from "./SearchBar";
import "./HotelList.css";
import filterIcon from "./filter.png";
import { HotelContext } from "../context/HotelContext";
import API_BASE_URL from "../config/api";

const HotelList = () => {
  const { city } = useParams();
  const { cache, saveHotelsToCache } = useContext(HotelContext);

  const [hotels, setHotels] = useState([]); // always an array
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: "All",
    price: "none",
    maxPrice: 20000,
    rating: "All",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filterIconRef = useRef();
  const filterDataRef = useRef();

  const toggleFilters = () => setShowFilters((prev) => !prev);

  // ✅ Fetch hotels
  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Use cached data if available
      if (cache[city]) {
        setHotels(cache[city]);
        // console.log(hotels);
        console.log(hotels);
        
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/user/hotelList/city/${city}`); 
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      // console.log("API response:", data); 

      // ✅ Handle any kind of response structure safely
      let hotelsArray = [];

      if (Array.isArray(data)) {
        hotelsArray = data;
      } else if (Array.isArray(data.hotels)) {
        hotelsArray = data.hotels;
      } else if (Array.isArray(data.data)) {
        hotelsArray = data.data;
      } else if (data.hotel) {
        hotelsArray = [data.hotel];
      }

      

      // ✅ Map to a clean hotel object format
      const hotelsList = hotelsArray.map((hotel) => ({
        id: hotel._id,
        hotelName: hotel.name || hotel.hotelName || "Unnamed Hotel",
        city: hotel.city || city,
        address: hotel.address || "No address provided",
        price: hotel.basePricePerNight  || hotel.pricePerNight ||  0,
        rating: hotel.starRating || 0,
        image: hotel.thumbnail || (hotel.images && hotel.images[0]) || "",
      }));
      

      setHotels(hotelsList);
      saveHotelsToCache(city, hotelsList);

       

      
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Failed to fetch hotels. Try again later.");
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on city change
  useEffect(() => {
    if (city) fetchHotels();
  }, [city]);

  // ✅ Apply filters
  useEffect(() => {
    if (!Array.isArray(hotels)) return; // safety guard

    let updatedHotels = [...hotels];

    // Filter by price
    updatedHotels = updatedHotels.filter(
      (hotel) => hotel.price <= filters.maxPrice
    );

    // Filter by rating
    if (filters.rating !== "All") {
      updatedHotels = updatedHotels.filter(
        (hotel) => hotel.rating >= Number(filters.rating)
      );
    }

    // Sort by price
    if (filters.price === "low") {
      updatedHotels.sort((a, b) => a.price - b.price);
    } else if (filters.price === "high") {
      updatedHotels.sort((a, b) => b.price - a.price);
    }

    setFilteredHotels(updatedHotels);
  }, [filters, hotels]);

  // ✅ Handle filter changes
  const handleFilterChange = (newFilters) =>
    setFilters((prev) => ({ ...prev, ...newFilters }));

  // ✅ Hide filters when clicked outside
  useEffect(() => {
    const checkClickOutside = (event) => {
      if (
        filterIconRef.current &&
        !filterIconRef.current.contains(event.target) &&
        filterDataRef.current &&
        !filterDataRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("click", checkClickOutside);
    return () => document.removeEventListener("click", checkClickOutside);
  }, []);

  // ✅ Render
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SearchBar />

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {/* Filters Sidebar */}
        <div
          ref={filterDataRef}
          className={`filters-wrapper ${showFilters ? "show" : ""}`}
        >
          <Filters onFilterChange={handleFilterChange} />
        </div>

        {/* Hotel Cards */}
        <div className="nameCard" style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <h1>{city?.toUpperCase()}</h1>
            <h4
              ref={filterIconRef}
              className="filterIcon"
              onClick={toggleFilters}
              style={{ cursor: "pointer" }}
            >
              <img style={{ width: "20px" }} src={filterIcon} alt="Filters" /> Filters
            </h4>
          </div>

          <div>
            {loading ? (
              <p>Loading hotels...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <p>No hotels found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;



