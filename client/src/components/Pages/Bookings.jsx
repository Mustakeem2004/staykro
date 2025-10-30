import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import "./Bookings.css"; // reuse styles

const Bookings = () => {
  const { bookings } = useContext(SearchContext);

  if (bookings.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>No bookings yet.</h2>;
  }

  return (
    <div className="payment-container">
      <h2>My Bookings</h2>
      {bookings.map((b, index) => (
        <div key={index} className="summary-card">
          <p><strong>City:</strong> {b.city}</p>
          <p><strong>Check-In:</strong> {b.checkIn}</p>
          <p><strong>Check-Out:</strong> {b.checkOut}</p>
          <p><strong>Guests:</strong> {b.people}</p>
          <p><strong>Total Paid:</strong> ₹{b.total}</p>
          <p><strong>Payment ID:</strong> {b.paymentId}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;

