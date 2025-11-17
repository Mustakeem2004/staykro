import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SuperAdminNavbar.css";

const SuperAdminNavBar = () => {
  const navigate=useNavigate();
    const { user, setUser, loading } = useContext(AuthContext);

    const handleLogout = async () => {
    try {
      await fetch(`https://staykro-backend.onrender.com/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      alert("logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  
  return (
    
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#0071c2",
      color: "white",
      alignItems: "center"
    }}>
      <h2>SuperAdmin</h2>
      <div style={{ display: "flex", gap: "15px" ,alignItems:"center"}}>
        <Link to="/superadmin" style={{ color: "white", textDecoration: "none" }}>All Hotels</Link>
        <Link to="/superadmin/add-hotel" style={{ color: "white", textDecoration: "none" }}>Add Hotel</Link>
        <button onClick={handleLogout} style={{ backgroundColor: "#ff4d4d", border: "none", padding: "6px 10px", color: "white", cursor: "pointer" }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SuperAdminNavBar;
