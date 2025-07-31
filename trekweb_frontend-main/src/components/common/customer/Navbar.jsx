import React, { useEffect, useState } from "react";
import { FaBars, FaHeart, FaTimes, FaBicycle, FaShoppingCart, FaStar, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaHome, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = JSON.parse(atob(token.split(".")[1]));
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-green-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <FaBicycle size={36} className="text-green-600 group-hover:text-green-700 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">RIDER'S</span>
              <span className="text-xs text-gray-500 font-medium tracking-wider">CHOICE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="nav-link" title="Home">
              <FaHome size={20} />
            </Link>
            <Link to="/packages" className="nav-link" title="Bikes">
              <FaBicycle size={20} />
            </Link>
            <Link to="/review" className="nav-link" title="Reviews">
              <FaStar size={20} />
            </Link>
            {user && (
              <Link to="/mybooking" className="nav-link relative" title="Cart">
                <FaShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </Link>
            )}
            <Link to="/contact" className="nav-link" title="Contact">
              <FaEnvelope size={20} />
            </Link>
            <Link to="/aboutus" className="nav-link" title="About Us">
              <FaInfoCircle size={20} />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/favorite" className="nav-link relative" title="Wishlist">
              <FaHeart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </Link>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/myprofile" className="user-btn" title="My Account">
                  <FaUser size={16} />
                </Link>
                <button onClick={handleLogout} className="user-btn-logout" title="Log Out">
                  <FaSignOutAlt size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="user-btn" title="Login">
                  <FaSignInAlt size={16} />
                </Link>
                <Link to="/register" className="user-btn-primary" title="Sign Up">
                  <FaUserPlus size={16} />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition-colors" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} className="text-gray-700" /> : <FaBars size={24} className="text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-green-100 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Link to="/" className="mobile-nav-link">
                <FaHome size={18} />
                <span>Home</span>
              </Link>
              <Link to="/packages" className="mobile-nav-link">
                <FaBicycle size={18} />
                <span>Bikes</span>
              </Link>
              <Link to="/review" className="mobile-nav-link">
                <FaStar size={18} />
                <span>Reviews</span>
              </Link>
              {user && (
                <Link to="/mybooking" className="mobile-nav-link">
                  <FaShoppingCart size={18} />
                  <span>Cart</span>
                </Link>
              )}
              <Link to="/contact" className="mobile-nav-link">
                <FaEnvelope size={18} />
                <span>Contact</span>
              </Link>
              <Link to="/aboutus" className="mobile-nav-link">
                <FaInfoCircle size={18} />
                <span>About Us</span>
              </Link>
            </div>
            
            {user ? (
              <div className="mt-4 pt-4 border-t border-green-100 space-y-2">
                <Link to="/myprofile" className="mobile-user-btn">
                  <FaUser size={16} />
                  <span>My Account</span>
                </Link>
                <button onClick={handleLogout} className="mobile-user-btn-logout">
                  <FaSignOutAlt size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-green-100 space-y-2">
                <Link to="/login" className="mobile-user-btn">
                  <FaSignInAlt size={16} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="mobile-user-btn-primary">
                  <FaUserPlus size={16} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          @apply text-gray-700 hover:text-green-600 transition-all duration-300 p-2 rounded-lg hover:bg-green-50 relative;
        }
        
        .user-btn {
          @apply bg-gray-100 text-gray-700 p-3 rounded-xl hover:bg-green-100 hover:text-green-700 transition-all duration-300 shadow-sm;
        }
        
        .user-btn-primary {
          @apply bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-sm;
        }
        
        .user-btn-logout {
          @apply bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 transition-all duration-300 shadow-sm;
        }
        
        .mobile-nav-link {
          @apply flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all duration-300;
        }
        
        .mobile-user-btn {
          @apply flex items-center space-x-3 w-full p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-all duration-300;
        }
        
        .mobile-user-btn-primary {
          @apply flex items-center space-x-3 w-full p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-300;
        }
        
        .mobile-user-btn-logout {
          @apply flex items-center space-x-3 w-full p-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
