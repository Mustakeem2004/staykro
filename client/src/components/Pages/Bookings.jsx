import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import "./Bookings.css";
import { toast } from 'react-toastify';

const Bookings = () => {
  const { bookings } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleBookAgain = (id) => {
    if (id) {
      navigate(`/hotel/${id}`);
    } else {
      toast.info("Discover more premium stays on our home page!");
      navigate("/");
    }
  };

  const handleViewReceipt = (paymentId) => {
    toast.success("Receipt generated successfully!");
    console.log("Generating receipt for payment:", paymentId);
    // Future: Use a library like jspdf to generate a real PDF
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateStayDuration = (start, end) => {
    if (!start || !end) return { nights: 0, days: 0 };
    const diffTime = Math.abs(new Date(end) - new Date(start));
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { nights, days: nights + 1 };
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-bookings">
        <div className="empty-content">
          <div className="empty-icon-circle">📂</div>
          <h2>No bookings yet</h2>
          <p>Your upcoming stays and past adventures will appear here. Start exploring our premium collection of hotels to plan your next journey.</p>
          <Link to="/" className="explore-btn-premium">Explore Hotels</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-dashboard">
      <div className="dashboard-header">
        <h1>Stay History</h1>
        <p>Review and manage your confirmed stays and upcoming adventures.</p>
      </div>

      <div className="bookings-list">
        {bookings.map((b, index) => {
          const { nights, days } = calculateStayDuration(b.checkIn, b.checkOut);
          return (
            <div key={index} className="booking-glass-card">
              <div className="card-header-flex">
                <div className="hotel-primary-details">
                  <span className="confirmation-tag">Confirmed</span>
                  <h3 className="hotel-title-text">{b.hotelName || "StayKro Premium Hotel"}</h3>
                  <p className="location-pin">📍 {b.city || "Various Locations"}</p>
                </div>
                <div className="price-summary-tag">
                  <label>Total Paid</label>
                  <span className="price-amount">₹{b.total?.toLocaleString()}</span>
                </div>
              </div>

              <div className="stay-duration-overview">
                <div className="calendar-dates">
                  <div className="date-block">
                    <label>From</label>
                    <span className="date-val">{formatDate(b.checkIn)}</span>
                  </div>
                  <div className="duration-arrow">
                    <span className="duration-pill">{nights} Nights • {days} Days</span>
                    <div className="line-arrow"></div>
                  </div>
                  <div className="date-block">
                    <label>To</label>
                    <span className="date-val">{formatDate(b.checkOut)}</span>
                  </div>
                </div>
              </div>

              <div className="booking-metadata">
                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <span>{b.people} {b.people === 1 ? "Guest" : "Guests"}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💳</span>
                  <span>Ref: {b.paymentId?.substring(0, 10)}</span>
                </div>
              </div>

              <div className="booking-footer-actions">
                <button 
                  className="secondary-action-btn"
                  onClick={() => handleViewReceipt(b.paymentId)}
                >
                  View Receipt
                </button>
                <button 
                  className="primary-action-btn"
                  onClick={() => handleBookAgain(b.hotelId)}
                >
                  Book Again
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;

