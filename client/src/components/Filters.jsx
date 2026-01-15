import React, { useEffect, useState } from "react";
import './Filters.css';
import API_BASE_URL from "../config/api";


const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: "All",
    price: "none",
    minPrice: 500,
    maxPrice: 20000,
    rating: "All",
  });

  const propertyTypes = ["All", "Hotel", "Villa", "Resort"];
  const priceOptions = [
    { value: "high", label: "High to Low" },
    { value: "low", label: "Low to High" },
    { value: "none", label: "None" },
  ];
  const ratings = ["All", "4", "3", "2", "1"];

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    
    setFilters(newFilters);
    onFilterChange(newFilters);

  };



  return (
    <aside
      className="filteraside"
    >
      <h1 style={{ margin: "auto", marginBottom: "0px", marginTop: "10px", textAlign: "center" }}>Filters</h1>
      <h4>Hotel Rating</h4>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div>
          {/* <h4 style={{ margin: "0px", fontWeight: "normal" }}>MinPrice </h4> */}
          <h4 style={{ margin: "0px", fontWeight: "normal" }}>₹{filters.minPrice}  </h4>

        </div>
        <div>-</div>

        <div>
          {/* <h4 style={{ margin: "0px", fontWeight: "normal" }}>MaxPrice </h4> */}
          <h4 style={{ margin: "0px", fontWeight: "normal" }}>₹{filters.maxPrice === 20000 ? "20000+" :filters.maxPrice}
          </h4>


        </div>


      </div>

      <input
        type="range"
        min="500"
        max="20000"
        step="500"
        value={(filters.maxPrice)}
        onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
      />
      {/* <h4>Property Type</h4>
      {propertyTypes.map((type) => (
        <label key={type}>
          <input
            type="radio"
            name="propertyType"
            value={type}
            checked={filters.propertyType === type}
            onChange={() => handleChange("propertyType", type)}
          />
          {type}
          <br />
        </label>
      ))} */}

      <h4>Sort by Price</h4>
      {priceOptions.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="price"
            value={option.value}
            checked={filters.price === option.value}
            onChange={() => handleChange("price", option.value)}
          />
          {option.label}
          <br />
        </label>
      ))}

      <h4>Hotel Rating</h4>
      {ratings.map((rate) => (
        <label key={rate}>
          <input
            type="radio"
            name="rating"
            value={rate}
            checked={filters.rating === rate}
            onChange={() => handleChange("rating", rate)}
          />
          {rate === "All" ? "All Ratings" : `${rate} Stars & Up`}
          <br />
        </label>
      ))}
    </aside>
  );
};

export default Filters;
