import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBarStyles.css";

const NavBar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar__content">
        <Link to="/" className="navbar__logo">
          MRWRA
        </Link>
        <div className="navbar__links">
          <Link to="/home" className="navbar__link">
            Home
          </Link>
          <Link to="/movie" className="navbar__link">
            Movies
          </Link>
          <Link to="/watchlist" className="navbar__link">
            Watchlist
          </Link>
          <Link to="/about" className="navbar__link">
            About
          </Link>
          <Link to="/movieratings" className="navbar__link">
            Review and Ratings
          </Link>
        </div>
        <Link to="/login" className="navbar__logout-btn" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
