import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="heading-footer">
        Grain<span>Chain</span>
      </div>
      <div className="div1">
        <h4 className="footer-h4">Who We Are</h4>
        <a href="/about-us" className="footer-link">About Us</a>
        <a href="#" className="footer-link">Our Work</a>
        <a href="/vision" className="footer-link">Our Vision</a>
        <a href="#" className="footer-link">Contact</a>
      </div>
      <div className="div2">
        <h4 className="footer-h4">Get Involved</h4>
        <a href="/requestfood" className="footer-link">Request For Food</a>
        <a href="#" className="footer-link">Partner with Us</a>
      </div>
      <div className="div3">
        <h4 className="footer-h4">Socials</h4>
        <p className="footer-p"></p>
          <a href="#" className="footer-link">
            <FaInstagram size={40} />
          </a>
          <a href="#" className="footer-link">
            <FaTwitter size={40} />
          </a>
          <a href="#" className="footer-link">
            <FaFacebook size={40} />
          </a>
      </div>
    </div>
  );
};

export default Footer;
