import React, { useState, useRef, useEffect, Suspense } from "react";
import "./App.css";
import "./styles/Pages.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const lazyWithRetry = (componentImport) => {
  return React.lazy(() => 
    componentImport().catch((error) => {
      console.error("Chunk loading failed, retrying page load:", error);
      window.location.reload();
      return new Promise(() => {});
    })
  );
};

const Events = lazyWithRetry(() => import("./components/Events"));
const AboutUs = lazyWithRetry(() => import("./components/AboutUs"));
const Workshops = lazyWithRetry(() => import("./components/Workshops"));
const Gallery = lazyWithRetry(() => import("./components/Gallery"));
const Sponsors = lazyWithRetry(() => import("./components/Sponsors"));
const Registration = lazyWithRetry(() => import("./components/Registration"));

import bgVideoWebm from "./assets/hero.webm";
import bgVideoMp4 from "./assets/hero.mp4";
import introVideoWebm from "./assets/intro.webm";
import introVideoMp4 from "./assets/intro.mp4";
import heroVideoPoster from "./assets/hero-poster.webp";
import introVideoPoster from "./assets/intro-poster.webp";

const getInitialTab = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      const normalized = tabParam.trim().toLowerCase();
      if (normalized === "registration" || normalized === "register") return "Registration";
      if (normalized === "events") return "Events";
      if (normalized === "workshops") return "Workshops";
      if (normalized === "gallery") return "Gallery";
      if (normalized === "sponsors") return "Sponsors";
      if (normalized === "about") return "About Us";
    }
    const hash = window.location.hash;
    if (hash) {
      const normalized = hash.replace("#", "").trim().toLowerCase();
      if (normalized === "registration" || normalized === "register") return "Registration";
      if (normalized === "events") return "Events";
      if (normalized === "workshops") return "Workshops";
      if (normalized === "gallery") return "Gallery";
      if (normalized === "sponsors") return "Sponsors";
      if (normalized === "about") return "About Us";
    }
  } catch (e) {
    console.error("Error reading URL parameters", e);
  }
  return "Home";
};

function App() {
  const initialTab = getInitialTab();
  const [showIntro, setShowIntro] = useState(initialTab === "Home");
  const [fadeIntro, setFadeIntro] = useState(false);
  const videoRef = useRef(null);

  const [activeTab, setActiveTab] = useState(initialTab);
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

  useEffect(() => {
    const handleUrlChange = () => {
      const targetTab = getInitialTab();
      if (targetTab !== activeTab) {
        setActiveTab(targetTab);
        if (targetTab !== "Home") {
          setShowIntro(false);
        }
      }
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Registration") {
      window.location.href = "https://unstop.com/events/astrax-26-chennai-institute-of-technology-1717881";
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
          {activeTab === "Events"    && (
            <Events 
              setActivePage={(page) => handleTabChange(page)} 
              onToggleExpand={(isOpen) => setHideNavbarOverride(isOpen)} 
            />
          )}
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