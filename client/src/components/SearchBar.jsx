
import "./SearchBar.css";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext.jsx";

function SearchBar() {
  const {
    city,
    setCity,
    people,
    setPeople,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
  } = useContext(SearchContext);
  

  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // 🔹 Dynamic API base (auto-switch local/production)
  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://travelwindow-backend.onrender.com";

  // 🔹 Fetch city suggestions
  const fetchSuggestions = async (input) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE}/api/cities?query=${encodeURIComponent(input)}`
      );
      const data = await res.json();
      setSuggestions(data || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle input changes
  const handleChangeCity = (e) => {
    const value = e.target.value;
    setCity(value);
    // setShowSuggestions(true);
    // fetchSuggestions(value);
  };

  // 🔹 Select city from dropdown
  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setShowSuggestions(false);
  };

  // 🔹 Handle guests input
  const handleChangePeople = (e) => {
    setPeople(e.target.value);
  };

  // 🔹 Navigate to hotels page with parameters
  const handleExplore = () => {
    if (!city) {
      alert("Please enter a city or hotel name");
      return;
    }

    const query = new URLSearchParams({
      checkIn,
      checkOut,
      people,
    }).toString();
    const LowerCity=city.toLowerCase();

    navigate(`/hotels/${LowerCity}`);
  };

  // 🔹 Handle "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleExplore();
  };

  // 🔹 Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔹 Get today’s date
  const today = new Date().toISOString().split("T")[0];
  

  return (
    <div className="input_container">
      {/* 🔹 Location */}
      <div className="card" ref={dropdownRef} style={{ position: "relative" }}>
        <h4>
          Location <i className="bi bi-caret-down-fill"></i>
        </h4>
        <input
          type="text"
          value={city}
          onChange={handleChangeCity}
          onKeyDown={handleKeyDown}
          placeholder="Enter city or hotel..."
        />

        {/* 🔹 Suggestions dropdown */}
        {showSuggestions && city && (
          <ul
            style={{
              border: "1px solid #ccc",
              background: "#fff",
              color: "#000",
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1000,
              margin: 0,
              padding: 0,
              borderRadius: "5px",
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? (
              <li style={{ listStyle: "none", padding: "8px" }}>Loading...</li>
            ) : suggestions.length > 0 ? (
              suggestions.map((c, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCity(c)}
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    listStyle: "none",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {c}
                </li>
              ))
            ) : (
              <li style={{ listStyle: "none", padding: "8px" }}>
                No results found
              </li>
            )}
          </ul>
        )}
      </div>

      {/* 🔹 Guests */}
      <div className="card">
        <h4>
          Guests <i className="bi bi-caret-down-fill"></i>
        </h4>
        <input
          onChange={handleChangePeople}
          type="number"
          value={people}
          placeholder="How many people"
          min="1"
        />
      </div>

      {/* 🔹 Check-in */}
      <div className="card">
        <h4>
          Check-in <i className="bi bi-caret-down-fill"></i>
        </h4>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          min={ today }
          max={checkOut ? new Date(new Date(checkOut).getTime() - 86400000).toISOString().split("T")[0] : ""}
        />
      </div>

      {/* 🔹 Check-out */}
      <div className="card">
        <h4>
          Check-out <i className="bi bi-caret-down-fill"></i>
        </h4>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={
            checkIn
              ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
              : today
          }
        />
      </div>

      {/* 🔹 Explore button */}
      <button className="explore_btn" onClick={handleExplore}>
        Explore Now
      </button>
    </div>
  );
}

export default SearchBar;

