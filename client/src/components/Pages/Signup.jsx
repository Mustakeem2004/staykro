
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import GoogleLogo from "../../assets/signupLoginLogo/google.png";
import FacebookLogo from "../../assets/signupLoginLogo/facebook.png";
import { AuthContext } from "../../context/AuthContext";
import API_BASE_URL from "../../config/api";
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext); // Refresh user state after signup

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminPasskey: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include", // important for httpOnly cookie
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to register");

      await fetchUser(); // Refresh user context

      navigate("/", { replace: true }); // Redirect to home/dashboard before route unmounts
      setTimeout(() => toast.success("Registration successful!"), 100);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="LoginBox">
      <h1>Create an account</h1>
  <div  className="Outside">
      <div className="input-group">
        <label>Name</label>
        <input className="formInput" type="text" name="name" value={formdata.name} onChange={handleChange} required />
      </div>
    </div>

      <div  className="Outside">
      <div className="input-group">
        <label>Email</label>
        <input className="formInput" type="email" name="email" value={formdata.email} onChange={handleChange} required />
      </div>
      </div>
      <div  className="Outside">
      <div className="input-group">
        <label>Password</label>
        <input className="formInput" type="password" name="password" value={formdata.password} onChange={handleChange} required />
      </div>
      </div>

      <div className="Outside">
        <div className="input-group">
          <label>Role</label>
          <select 
            className="formInput" 
            name="role" 
            value={formdata.role} 
            onChange={handleChange} 
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>
        </div>
      </div>

      {(formdata.role === "admin" || formdata.role === "superadmin") && (
        <div className="Outside">
          <div className="input-group">
            <label>Passkey</label>
            <input 
              className="formInput" 
              type="password" 
              name="adminPasskey" 
              value={formdata.adminPasskey} 
              onChange={handleChange} 
              placeholder={`Enter ${formdata.role} passkey`}
              required 
            />
          </div>
        </div>
      )}

      <button type="submit" className="signUpBtn">Sign up</button>

      <p className="orWith">-------------- or With ---------------</p>

      <button type="button" className="googleBtn" onClick={() => {
        window.location.href = `${API_BASE_URL}/api/auth/google`;
        }}>
        <img src={GoogleLogo} alt="Google" /> Continue with Google
      </button>

      {/* <button type="button" className="facebookBtn">
        <img src={FacebookLogo} alt="Facebook" /> Continue with Facebook
      </button> */}

      <p style={{ marginTop: "15px" }}>
        Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
      </p>
    </form>
  );
};

export default Signup;


