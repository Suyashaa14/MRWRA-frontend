import React from "react";
import "./styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-us">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>
        <div className="footer-logo">
          <Link to="/" className="navbar__logo">
            MRWRA
          </Link>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/" target="_blank" className="social-link">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      {/* <div className="feedback-form">
        <h3>Provide Feedback</h3>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Feedback</label>
            <textarea></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div> */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Movie Recommendation System</p>
      </div>
    </footer>
  );
};

export default Footer;
