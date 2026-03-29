
import './Navbar.css';
import logo from '../assets/bannerimages/mountain.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import userIcon from './user.png';
import trolley from './trolley.png';
import lineIcon from './triple.png'
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import home from '../assets/home.png'
import contact from '../assets/contact-us.png'
import bad from '../assets/bad.png'
import about from '../assets/about.png'
import { NavLink ,useLocation} from 'react-router-dom';
import API_BASE_URL from "../config/api";



function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);
  const {clearCart, cartCount } = useContext(CartContext);
  const [navtoggle,setNavToggle]=useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const userIconRef = useRef();
  const tripleIconRef= useRef();
  const navMenuRef = useRef();
  const location=useLocation();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      clearCart();
      setDropdownOpen(false);

      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };



  useEffect(() => {
  const handleClickOut = (event) => {
    if (
      navMenuRef.current &&
      !navMenuRef.current.contains(event.target) && // not inside menu
      tripleIconRef.current &&
      !tripleIconRef.current.contains(event.target) // not on toggle
    ) {
      setNavToggle(false);
    }
  };

  document.addEventListener("mousedown", handleClickOut);
  return () => {
    document.removeEventListener("mousedown", handleClickOut);
  };
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Loading check before JSX
  // if (loading) return <div>Loading...</div>;

  // const changeToggleNav=(event)=>{
  //  setNavToggle((prev) => !prev);
  //     if (
  //       tripleIconRef.current &&
  //       !tripleIconRef.current.contains(event.target)
  //     ) {
  //       setNavToggle(false);
  //     }

  // }






// put this above return()
const changeToggleNav = () => {
  setNavToggle((prev) => !prev);
};


  return (
    <nav className="nav_bar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "40px",height:"40px", filter: "invert(1)" }} />
        </Link>
      </div>

      {/* Nav Links */}
      <div ref={navMenuRef} className={`${navtoggle ? "tripleshow" : "triplehide"}`}>
        <NavLink onClick={()=>setNavToggle(false)}  to="/" className={({ isActive }) => isActive ? "active" : ""} ><img className='navlogos' src={home} alt="" />Home</NavLink>
        <NavLink onClick={()=>setNavToggle(false)} to="/about" className={({ isActive }) => isActive ? "active" : ""}><img className='navlogos' src={about} alt="" />About</NavLink>
        <NavLink onClick={()=>setNavToggle(false)} to="/contact" className={({ isActive }) => isActive ? "active" : ""}><img className='navlogos' src={contact} alt="" />Contact</NavLink>
        <NavLink onClick={()=>setNavToggle(false)} to="/bookings" className={({ isActive }) => isActive ? "active" : ""}><img className='navlogos' src={bad} alt="" />Bookings</NavLink>
      </div>

      {/* Right-side icons */}
      <div className='iconsRightBox'>
        {/* Auth Section */}
        <div style={{ position: "relative" }}>
          {user ? (
            <>
              <img
                
                src={userIcon}
                alt="user"
                ref={userIconRef}
                
                className='userCircleNav'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="dropdown" ref={dropdownRef}>
                  <div className="dropdown-header">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="#003b95" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span style={{ fontWeight: "bold", fontSize: "14px", color:"#333" }}>{user.name}</span>
                  </div>
                  <div className="dropdown-header" style={{ color: "#666" }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span>{user.email}</span>
                  </div>
                  
                  <hr className="dropdown-divider" />
                  
                  <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/bookings'); }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    Bookings
                  </button>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="auth_buttons">
              <button onClick={() => navigate('/login',{ state: { from: location } })} className="login_btn">Login</button>
              <button onClick={() => navigate('/signup',{ state: { from: location } })} className="register_btn">Signup</button>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <div>
          <Link to="/cart">
            <img src={trolley} className="cart-icon" alt="cart" />
          </Link>
        </div>
        <div style={{ position: "relative" }}>
          {cartCount > 0 && (
            <span
              className='cartCount'
            >
              {cartCount}
            </span>
            
          )}
<div onClick={changeToggleNav} ref={tripleIconRef}>
  <img style={{cursor:"pointer"}} className='triple' src={lineIcon} alt="" />
</div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;


