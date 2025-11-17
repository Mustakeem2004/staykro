
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
                  <p className="dropdown-item">{user.name}</p>
                  <p className="dropdown-item">{user.email}</p>
                  <button className="dropdown-item" onClick={() => navigate('/bookings')}>Bookings</button>
                  <button style={{ backgroundColor: "black", color: "white" }} className="dropdown-item" onClick={handleLogout}>Logout</button>
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
              style={{
                position: "absolute",
                top: "-28px",
                right: "20px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                zIndex:"-1000000"
              }}
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


