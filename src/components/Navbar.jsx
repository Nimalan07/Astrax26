import { useState, useEffect } from "react";
import navLogo from "../assets/title.webp";
import tImg from "../assets/t.webp";
import pImg from "../assets/p.webp";
import rImg from "../assets/r.webp";
import sImg from "../assets/s.webp";
import mImg from "../assets/m.webp";
import spImg from "../assets/sp.webp";
import "../styles/Navbar.css";
import { triggerRazorpayPayment } from "../utils/payment";

// src/components/Navbar.jsx

function Navbar({ activeTab, onTabChange, forceHidden }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up - show navbar
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    setIsMenuOpen(false);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  return (
    <nav className={`navbar ${(showNavbar && !forceHidden) ? "" : "navbar--hidden"}`}>
      <div className="logo" onClick={() => handleTabClick("Home")}>
        <img src={navLogo} alt="Astrax Logo" className="logo-img" />
      </div>

      <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li className={`nav-item power ${activeTab === "Home" ? "active-stone" : ""}`} onClick={() => handleTabClick("Home")}>
          <img src={pImg} alt="Power" className="nav-stone-img" style={{ width: "16px", height: "16px" }} />
          Home
        </li>
        <li className={`nav-item time ${activeTab === "Events" ? "active-stone" : ""}`} onClick={() => handleTabClick("Events")}>
          <img src={tImg} alt="Time" className="nav-stone-img" />
          Events
        </li>
        <li className={`nav-item soul ${activeTab === "Workshops" ? "active-stone" : ""}`} onClick={() => handleTabClick("Workshops")}>
          <img src={sImg} alt="Soul" className="nav-stone-img" />
          Workshops
        </li>
        <li className={`nav-item mind ${activeTab === "Gallery" ? "active-stone" : ""}`} onClick={() => handleTabClick("Gallery")}>
          <img src={mImg} alt="Mind" className="nav-stone-img" style={{ width: "50px", height: "50px", margin: "0 -12px" }} />
          Gallery
        </li>
        <li className={`nav-item space ${activeTab === "Sponsors" ? "active-stone" : ""}`} onClick={() => handleTabClick("Sponsors")}>
          <img src={spImg} alt="Space" className="nav-stone-img" style={{ width: "50px", height: "50px", margin: "0 -12px" }} />
          Sponsors
        </li>
        <li className={`nav-item reality ${activeTab === "About Us" ? "active-stone" : ""}`} onClick={() => handleTabClick("About Us")}>
          <img src={rImg} alt="Reality" className="nav-stone-img" />
          About Us
        </li>
        <li className="nav-mobile-register">
          <button className="register-btn mobile-reg-btn" onClick={() => handleTabClick("Registration")}>
            Register Now
          </button>
        </li>
      </ul>

      <div className="nav-actions-container">
        <button className="register-btn desktop-reg-btn" onClick={() => handleTabClick("Registration")}>
          Register Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;