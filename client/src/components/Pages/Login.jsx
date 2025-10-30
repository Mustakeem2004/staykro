


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import GoogleLogo from "../../assets/signupLoginLogo/google.png";
import FacebookLogo from "../../assets/signupLoginLogo/facebook.png";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";


const Login = () => {
  const { fetchUser } = useContext(AuthContext); // Refresh context after login
  const navigate = useNavigate();
  const location = useLocation();
  // Get the route user came from
  const from = location.state?.from?.pathname  || "/";

  

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include", // Important for httpOnly cookie
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to login");

      await fetchUser(); // Refresh user context
      navigate(from, { replace: true });
      setTimeout(() => alert("Login successful!"), 100);

  
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <form 
      className="LoginBox"
    onSubmit={handleSubmit} >
      <h1>Login to your account</h1>
    <div className="Outside">
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

      <div className="options">
        {/* <label ><input type="checkbox" /> Remember me</label> */}
        <p className="forgot">Forgot Password?</p>
      </div>

      <button type="submit" className="signUpBtn">Login</button>

      <p className="orWith">-------------- or With ---------------</p>

      <button
        type="button"
        className="googleBtn"
        onClick={() => {
        window.location.href = "http://localhost:3000/api/auth/google";
        }}
      >
      <img src={GoogleLogo} alt="Google" /> Login with Google
      </button>

      {/* <button type="button" className="facebookBtn">
        <img src={FacebookLogo} alt="Facebook" /> Login with Facebook
      </button> */}

        <p style={{ marginTop: "15px" }}>
        Did not have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Signup</span>
      </p>
    </form>
  );
};

export default Login;
