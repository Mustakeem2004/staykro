import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // 👈 external CSS for responsiveness

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / About */}
        <div className="footer-section">
          <h2 className="footer-logo">HotelBooking</h2>
          <p className="footer-text">
            Explore the best hotels in Uttarakhand. Find your stay with ease and comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p>Email: support@hotelbooking.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Dehradun, Uttarakhand</p>
        </div>
      </div>

      <hr className="footer-divider" />
      <p className="footer-bottom">
        © {new Date().getFullYear()} HotelBooking. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
