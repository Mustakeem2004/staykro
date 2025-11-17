// import React from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminNavBar = () => {
//   const navigate=useNavigate();
//     const { user, setUser, loading } = useContext(AuthContext);

//     const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:3000/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       setUser(null);
//       alert("logout");
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

  
//   return (
    
//     <nav style={{
//       display: "flex",
//       justifyContent: "space-between",
//       padding: "10px 20px",
//       backgroundColor: "#0071c2",
//       color: "white",
//       alignItems: "center"
//     }}>
//       <h2>Hotel Admin</h2>
//       <div style={{ display: "flex", gap: "15px" ,alignItems:"center"}}>
//         <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>My Hotels</Link>
//         <Link to="/admin/add-hotel" style={{ color: "white", textDecoration: "none" }}>Add Hotel</Link>
//         <button onClick={handleLogout} style={{ backgroundColor: "#ff4d4d", border: "none", padding: "6px 10px", color: "white", cursor: "pointer" }}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavBar;







import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HotelContext } from "../../context/HotelContext";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [hasHotel, setHasHotel] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check if admin already has a hotel
  useEffect(() => {
    const fetchAdminHotel = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/hotels/${user?._id}`, {
          credentials: "include",
        });
        const data = await res.json();
        
        if (res.ok && data.hotels) {
          setHasHotel(true);
        } else {
          setHasHotel(false);
        }
      } catch (err) {
        console.error("Error checking admin hotel:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchAdminHotel();
  }, [user]);

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      alert("Logged out");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  useEffect(() => {
  const handleHotelAdded = () => setHasHotel(true);
  const handleHotelDeleted = () => setHasHotel(false);

  window.addEventListener("hotelAdded", handleHotelAdded);
  window.addEventListener("hotelDeleted", handleHotelDeleted);

  return () => {
    window.removeEventListener("hotelAdded", handleHotelAdded);
    window.removeEventListener("hotelDeleted", handleHotelDeleted);
  };
}, []);


  if (loading) return null; // optional: could show spinner

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#0071c2",
        color: "white",
        alignItems: "center",
      }}
    >
      <h2>Hotel Admin</h2>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
          My Hotels
        </Link>

        {/* ✅ Conditionally show or disable Add Hotel button */}
        {hasHotel ? (
          <button
            disabled
            style={{
              backgroundColor: "gray",
              border: "none",
              padding: "6px 10px",
              color: "white",
              cursor: "not-allowed",
            }}
          >
            Hotel Added
          </button>
        ) : (
          <Link
            to="/admin/add-hotel"
            style={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "#28a745",
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          >
            Add Hotel
          </Link>
        )}

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4d",
            border: "none",
            padding: "6px 10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;

