import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import "./PaymentPage.css";
import API_BASE_URL from "../../config/api";
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { people, checkIn, checkOut, setBookings, bookings } = useContext(SearchContext);
  const { user, loading: authLoading } = useContext(AuthContext);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // ✅ Auth Guard & Redirect
  useEffect(() => {
    if (!authLoading && !user) {
      toast.warn("Please login to proceed with the payment.");
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // ✅ Fetch Hotel Data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/hotels/details/${id}`);
        if (!res.ok) throw new Error("Hotel not found");
        const data = await res.json();
        setHotel(data.hotel || data);
      } catch (err) {
        console.error("Error fetching hotel:", err);
        toast.error("Failed to load hotel details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchHotel();
  }, [id]);

  // ✅ Calculate Pricing
  const calculatePricing = () => {
    if (!checkIn || !checkOut || !hotel) return { nights: 0, subtotal: 0, tax: 0, total: 0 };
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
    
    const pricePerNight = hotel.basePricePerNight || hotel.rooms?.[0]?.pricePerNight || 0;
    const subtotal = nights * pricePerNight;
    const tax = subtotal * 0.12; // 12% GST
    const total = subtotal + tax;
    
    return { nights, subtotal, tax, total };
  };

  const { nights, subtotal, tax, total } = calculatePricing();

  const loadRazorpay = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!total || total <= 0) {
      toast.error("Invalid booking amount.");
      return;
    }

    setPaymentLoading(true);

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Payment system failed to load. Please check your connection.");
      setPaymentLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(`${API_BASE_URL}/api/payment/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const orderData = await orderRes.json();

      const options = {
        key: "rzp_test_RRPfLSeGpXEZzL",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "StayKro Booking",
        description: `Booking for ${hotel?.name}`,
        order_id: orderData.id,
        handler: function (response) {
          toast.success("Payment Successful! Your stay is booked.");
          const newBooking = {
            hotelId: id,
            hotelName: hotel?.name,
            checkIn,
            checkOut,
            people,
            total,
            paymentId: response.razorpay_payment_id,
          };
          setBookings([...bookings, newBooking]);
          navigate("/bookings");
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "",
          contact: user?.phone || "9999999999",
        },
        theme: { color: "#003b95" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong with the payment.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading || authLoading) return <div className="payment-loading">Loading your booking details...</div>;

  return (
    <div className="payment-page-wrapper">
      <div className="payment-container">
        {/* Left Section: Hotel Info & Selection */}
        <div className="booking-details-section">
          <h2>Review Your Booking</h2>
          <div className="hotel-summary-card">
            <img 
              src={hotel?.thumbnail?.startsWith("http") ? hotel.thumbnail : `${API_BASE_URL}/${hotel?.thumbnail}`} 
              alt={hotel?.name} 
              className="hotel-preview-img"
            />
            <div className="hotel-text-info">
              <h3>{hotel?.name}</h3>
              <p className="hotel-loc">📍 {hotel?.address}, {hotel?.city}</p>
              <div className="booking-tags">
                <span>📅 {nights} Nights</span>
                <span>👥 {people} Guests</span>
              </div>
            </div>
          </div>

          <div className="dates-pill-container">
            <div className="date-pill">
              <label>Check-in</label>
              <strong>{new Date(checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
            </div>
            <div className="arrow-icon">➔</div>
            <div className="date-pill">
              <label>Check-out</label>
              <strong>{new Date(checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
            </div>
          </div>
        </div>

        {/* Right Section: Price Summary & Payment */}
        <div className="price-summary-sidebar">
          <h3>Price Details</h3>
          <div className="price-row">
            <span>Base Price ({nights} nights)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="price-row">
            <span>Taxes & Fees (12% GST)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
          <hr />
          <div className="price-row total-row">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <button 
            className="premium-pay-btn" 
            onClick={handlePayment} 
            disabled={paymentLoading}
          >
            {paymentLoading ? "🔒 Securely Processing..." : `Pay ₹${total.toLocaleString()} Now`}
          </button>
          <p className="secure-text">🛡️ Secure 256-bit SSL Encrypted Payment</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
