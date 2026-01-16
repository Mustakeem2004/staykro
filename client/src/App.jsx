import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config/api";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";
import AuthSuccess from "./components/Pages/AuthSuccess";
import Bookings from "./components/Pages/Bookings";
import HotelDetails from "./components/HotelDetails";
import HotelList from "./components/HotelList";
import NotFound from "./components/Pages/Notfound";
import Cart from "./components/Cart";
import PaymentPage from "./components/Pages/PaymentPage";

import AdminNavBar from "./components/admin/AdminNavbar";
import AdminHotelList from "./components/admin/AdminHotelList";
import EditHotelForm from "./components/admin/EditHotelForm";
import AddHotelForm from "./components/admin/AddHotelForm";
import AdminHotelDetails from "./components/admin/AdminHotelDetails";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { HotelProvider } from "./context/HotelContext";
import ScrollToTop from "./components/ScrollToTop";

import SuperAdminHotelCard from "./components/superadmin/SuperAdminHotelCard";
import SuperAdminHotelList from "./components/superadmin/SuperAdminHotelList";
import SuperAdminAddHotelForm from  "./components/superadmin/SuperAdminAddHotelForm";
import SuperAdminEditHotelForm from "./components/superadmin/SuperAdminEditHotelForm";
import SuperAdminNavBar from "./components/superadmin/SuperAdminNavbar";
import SuperAdminHotelDetails from "./components/superadmin/SuperAdminHotelDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <HotelProvider>
              <ScrollToTop />
              <AppContent />
            </HotelProvider>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch user info when app loads
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include", // send cookies
    })
      .then(async (res) => {
        
        
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setRole(data.role);
        
        

        // Optional: redirect based on role
        // if (data.role === "admin" || data.role === "superadmin") {
        //   navigate("/admin/hotels");
        // } else {
        //   navigate("/");
        // }
      })
      .catch(() => {
        setRole("guest");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

//   if (loading) return (
//   <div style={{ textAlign: "center", marginTop: "100px" }}>
//     <h2>Loading...</h2>
//   </div>
// );


  return (
    <>
      {/* Show correct navbar */}
      {role === "user" && <Navbar />}
      {role === "admin"  && <AdminNavBar />}
      {role === "superadmin" && <SuperAdminNavBar/>}
      {role === "guest" && <Navbar />}

    
      <Routes>
        {/* Public/User routes */}
        
        {(role === "user" || role==="guest" ) && (
          <>
        <Route path="/" element={<Home />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/hotels/:city" element={<HotelList />} />
        <Route path="/hotels/:city/:id" element={<HotelDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/cart" element={<Cart />} />
        
        </>
        )}



    

        {/* Admin-only routes */}
        {(role === "admin" ) && (
          <Route path="/admin/*" element={<AdminRoutes />} />
        )}
        {(role === "admin") && (
          <Route path="/" element={<AdminHotelList />} />

        )}



        {/* SuperAdmin-only routes */}
        {(role === "superadmin") && (
          <Route path="/superadmin/*" element={<SuperAdminRoutes />} />
        )}
        {(role === "superadmin") && (
          <Route path="/" element={<SuperAdminHotelList />} />

        )}
        
        <Route path="*" element={<NotFound />} />
      </Routes>


      <Footer />
    </>
  );
}

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHotelList />} />
    <Route path="add-hotel" element={<AddHotelForm />} />
    <Route path="edit-hotel/:id" element={<EditHotelForm />} />
    <Route path=":city/:id" element={<AdminHotelDetails />} />
    <Route path="*" element={<h2>Admin Page Not Found</h2>} />
  </Routes>
);



const SuperAdminRoutes = () => (
  <Routes>
    <Route path="/" element={<SuperAdminHotelList />} />
    <Route path="add-hotel" element={<SuperAdminAddHotelForm />} />
    <Route path="edit-hotel/:id" element={<SuperAdminEditHotelForm />} />
    <Route path=":city/:id" element={<SuperAdminHotelDetails />} />
    <Route path="*" element={<h2>Admin Page Not Found</h2>} />
  </Routes>
);

export default App;

