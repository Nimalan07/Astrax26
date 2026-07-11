import "../styles/Hero.css";
import titleImg from "../assets/title.webp";
import tesImg from "../assets/tes.webp";
import aetImg from "../assets/aet.webp";
import powImg from "../assets/pow.webp";
import souImg from "../assets/sou.webp";
import sepImg from "../assets/sep.webp";
import eyeImg from "../assets/eye.webp";
import atheraLogo from "../assets/athera.webp";
import Countdown from "./Countdown";
import { triggerRazorpayPayment } from "../utils/payment";

// src/components/Hero.jsx

function Hero({ onTabChange }) {
  return (
    <section className="hero-content">

      {/* Floating ambient particles background */}
      <div className="hero-ambient">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="ambient-orb" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
          }} />
        ))}
      </div>


      {/* Infinity stone decorative strip */}
      
      {/* Spacer to align with background video logo */}
      <div className="hero-logo-spacer"></div>

      {/* CTA buttons */}
      <div className="hero-buttons">
        <button className="primary-btn" onClick={() => onTabChange && onTabChange("Registration")}>
          <span className="btn-glow" />
          Register Now
        </button>
        <button className="secondary-btn" onClick={() => onTabChange && onTabChange("Events")}>Explore Events</button>
      </div>


      {/* Countdown */}
      <Countdown />

      {/* Presented by Athera Bottom Centered */}
      <div className="hero-presented-by-bottom">
        <span className="presented-by-label">PRESENTED BY</span>
        <img src={atheraLogo} alt="Athera Logo" className="presented-by-logo" />
      </div>

    </section>
  );
}

export default Hero;