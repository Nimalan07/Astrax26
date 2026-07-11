import React, { useState, useRef, useEffect, Suspense } from "react";
import "./App.css";
import "./styles/Pages.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Events = React.lazy(() => import("./components/Events"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const Workshops = React.lazy(() => import("./components/Workshops"));
const Gallery = React.lazy(() => import("./components/Gallery"));
const Sponsors = React.lazy(() => import("./components/Sponsors"));
const Registration = React.lazy(() => import("./components/Registration"));

import bgVideoWebm from "./assets/hero.webm";
import bgVideoMp4 from "./assets/hero.mp4";
import introVideoWebm from "./assets/intro.webm";
import introVideoMp4 from "./assets/intro.mp4";
import heroVideoPoster from "./assets/hero-poster.webp";
import introVideoPoster from "./assets/intro-poster.webp";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeIntro, setFadeIntro] = useState(false);
  const videoRef = useRef(null);

  const [activeTab, setActiveTab] = useState("Home");
  const [hideNavbarOverride, setHideNavbarOverride] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (activeTab === "Home") {
      document.documentElement.classList.add("home-active");
      document.body.classList.add("home-active");
    } else {
      document.documentElement.classList.remove("home-active");
      document.body.classList.remove("home-active");
    }

    if (activeTab === "Gallery") {
      document.documentElement.classList.add("gallery-active");
      document.body.classList.add("gallery-active");
    } else {
      document.documentElement.classList.remove("gallery-active");
      document.body.classList.remove("gallery-active");
    }
  }, [activeTab]);

  const handleIntroEnd = () => {
    setFadeIntro(true);
    setTimeout(() => setShowIntro(false), 800);
  };

  const handleSkip = () => handleIntroEnd();

  const handleTabChange = (tabName) => {
    setHideNavbarOverride(false);
    if (tabName === activeTab) return;
    setActiveTab(tabName);
  };

  return (
    <div className="app">
      {showIntro && (
        <div className={`intro-preloader ${fadeIntro ? "fade-out" : ""}`}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            poster={introVideoPoster}
            onEnded={handleIntroEnd}
            className="intro-video"
          >
            <source src={introVideoWebm} type="video/webm" />
            <source src={introVideoMp4} type="video/mp4" />
          </video>
          <div className="intro-controls">
            <button className="intro-btn skip-btn" onClick={handleSkip}>
              SKIP INTRO <span className="arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {!showIntro && activeTab === "Home" && (
        <>
          <div className="bg-video-container">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroVideoPoster}
              className="bg-video"
            >
              <source src={bgVideoWebm} type="video/webm" />
              <source src={bgVideoMp4} type="video/mp4" />
            </video>
          </div>
          <div className="overlay"></div>
        </>
      )}

      <Navbar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        forceHidden={hideNavbarOverride}
      />

      <div className="page-container">
        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
          {!showIntro && activeTab === "Home"      && <Hero onTabChange={handleTabChange} />}
          {activeTab === "Events"    && <Events setActivePage={(page) => handleTabChange(page)} />}
          {activeTab === "About Us"  && <AboutUs />}
          {activeTab === "Workshops" && (
            <Workshops 
              setActivePage={(page) => handleTabChange(page)} 
              onToggleExpand={(isExpanded) => setHideNavbarOverride(isExpanded)}
            />
          )}
          {activeTab === "Gallery"   && <Gallery />}
          {activeTab === "Sponsors"  && <Sponsors />}
          {activeTab === "Registration" && <Registration />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;