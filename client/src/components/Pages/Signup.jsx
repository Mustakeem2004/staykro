
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import GoogleLogo from "../../assets/signupLoginLogo/google.png";
import FacebookLogo from "../../assets/signupLoginLogo/facebook.png";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext); // Refresh user state after signup

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include", // important for httpOnly cookie
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to register");

      await fetchUser(); // Refresh user context

      alert("Registration successful!");
 // Redirect to home
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message || "Something went wrong, please try again.");
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

      <button type="submit" className="signUpBtn">Sign up</button>

      <p className="orWith">-------------- or With ---------------</p>

      <button type="button" className="googleBtn" onClick={() => {
        window.location.href = "http://localhost:3000/api/auth/google";
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


