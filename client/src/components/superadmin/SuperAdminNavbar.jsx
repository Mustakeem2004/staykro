import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SuperAdminNavbar.css";
import API_BASE_URL from "../../config/api";
import { toast } from 'react-toastify';

const SuperAdminNavBar = () => {
  const navigate=useNavigate();
    const { user, setUser, loading } = useContext(AuthContext);

    const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      toast.success("logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  
  return (
    <nav className="adminNavbar">
      <h2>SuperAdmin</h2>
      <div className="navLinks">
        <Link to="/superadmin" style={{ color: "white", textDecoration: "none" }}>All Hotels</Link>
        <Link to="/superadmin/add-hotel" style={{ color: "white", textDecoration: "none" }}>Add Hotel</Link>
        <button onClick={handleLogout} className="logoutBtn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SuperAdminNavBar;
