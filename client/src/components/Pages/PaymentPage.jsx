import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import "./PaymentPage.css";
import HotelCard from "../HotelCard";

const PaymentPage = () => {
  const { city, people, checkIn, checkOut, setBookings, bookings } =
    useContext(SearchContext);

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !people) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.max(
      0,
      Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    );
    return nights * people * 5000;
  };

  const total = calculateTotal();
  const [loading, setLoading] = useState(false);

  const loadRazorpay = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!total) {
      alert("Please select valid booking details!");
      return;
    }

    setLoading(true);

    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    // Create order on backend
    const orderData = await fetch(`${API_BASE_URL}/api/payment/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    }).then((t) => t.json());

    const options = {
      key: "rzp_test_RRPfLSeGpXEZzL",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Hotel Booking",
      description: `Booking for ${city}`,
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment Successful!");
        // console.log("Payment details:", response);

        // ✅ Save booking to context
        const newBooking = {
          city,
          checkIn,
          checkOut,
          people,
          total,
          paymentId: response.razorpay_payment_id,
        };
        setBookings([...bookings, newBooking]);
      },
      prefill: { name: "Guest Name", email: "guest@example.com", contact: "9999999999" },
      notes: { city },
      theme: { color: "#0077ff" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="payment-container">
      {/* <HotelCard key={hotel._id}></HotelCard> */}
      <div className="summary-section">
        <h2>Booking Summary</h2>
        <div className="summary-card">
          <p><strong>City:</strong> {city || "Not selected"}</p>
          <p><strong>Check-In:</strong> {checkIn || "Not selected"}</p>
          <p><strong>Check-Out:</strong> {checkOut || "Not selected"}</p>
          <p><strong>Guests:</strong> {people || 0}</p>
          <hr />
          <p className="total"><strong>Total:</strong> ₹{total}</p>
        </div>
      </div>

      <div className="payment-section">
        <h2>Payment</h2>
        <button className="pay-btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${total} Now`}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
