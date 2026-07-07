import { useState } from "react";
import "../styles/Workshop.css";
import upcomingVideoWebm from "../assets/upcoming.webm";
import upcomingVideoMp4 from "../assets/upcoming.mp4";
const defenseWorkshops = [
  {
    id: "def-1",
    title: "CYBER SECURITY 101",
    description: "Master the digital defense arts. Learn cybersecurity fundamentals, ethical hacking, vulnerability assessment, and how to defend against cyber threats in the modern digital age.",
    level: "Intermediate",
    duration: "3 Hours",
    btnText: "Coming Soon"
  },
  {
    id: "def-2",
    title: "ETHICAL HACKING",
    description: "Step into the shoes of a hacker to secure systems. Explore vulnerability scanning, network sniffing, exploit execution, and defensive countermeasures.",
    level: "Advanced",
    duration: "4 Hours",
    btnText: "Coming Soon"
  },
  {
    id: "def-3",
    title: "CLOUD SECURITY",
    description: "Secure modern cloud architectures. Understand IAM, container protection, Kubernetes security audits, and automated security scanning in CI/CD pipelines.",
    level: "Advanced",
    duration: "3 Hours",
    btnText: "Coming Soon"
  }
];

const cognitionWorkshops = [
  {
    id: "cog-1",
    title: "INTRO TO AI/ML",
    description: "Uncover the secrets of machine cognition. Dive into Artificial Intelligence, neural networks, supervised learning algorithms, and build models that think for themselves.",
    level: "Intermediate",
    duration: "4 Hours",
    btnText: "Coming Soon"
  },
  {
    id: "cog-2",
    title: "GENERATIVE AI",
    description: "Harness the power of Large Language Models. Master prompt patterns, build custom GPT agents, integrate vector databases, and implement semantic search.",
    level: "Beginner",
    duration: "3 Hours",
    btnText: "Coming Soon"
  },
  {
    id: "cog-3",
    title: "COMPUTER VISION",
    description: "Teach machines to see the world. Explore CNNs, image segmentation, object detection models like YOLO, and real-time video processing pipelines.",
    level: "Advanced",
    duration: "5 Hours",
    btnText: "Coming Soon"
  }
];

function Workshops({ setActivePage, onToggleExpand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSide, setActiveSide] = useState(null); // "left", "right", or null

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onToggleExpand) {
      onToggleExpand(nextState);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    const { clientX } = e;
    const width = window.innerWidth;

    if (activeSide === "left") {
      if (clientX > width * 0.70) {
        setActiveSide(null);
      }
    } else if (activeSide === "right") {
      if (clientX < width * 0.30) {
        setActiveSide(null);
      }
    } else {
      if (clientX < width * 0.45) {
        setActiveSide("left");
      } else if (clientX > width * 0.55) {
        setActiveSide("right");
      }
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) return;
    setActiveSide(null);
  };

  const handlePanelClick = (side) => {
    if (activeSide === null) {
      setActiveSide(side);
    }
  };

  return (
    <section id="workshops" className={`workshops-section ${isOpen ? "expanded" : "collapsed"}`}>
      
      {!isOpen ? (
        // COLLAPSED / COMING SOON VIEW (Full Screen Video Background)
        <>
          <video autoPlay muted loop playsInline className="workshop-video-bg">
            <source src={upcomingVideoWebm} type="video/webm" />
            <source src={upcomingVideoMp4} type="video/mp4" />
          </video>
          <div className="workshop-overlay-fixed"></div>
          

 
          <div className="workshop-teaser-fullscreen" onClick={handleToggle}>     
            <div className="teaser-content">
              <span className="teaser-tagline">LEARN • BUILD • INNOVATE</span>
              <h2 className="teaser-title">WORKSHOPS</h2>
              <div className="coming-soon-badge-container">
                <span className="coming-soon-badge">COMING SOON</span>
              </div>
              <p className="teaser-hint">Click to Reveal & Explore</p>
            </div>
            <div className="corners-decor-fullscreen">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
            </div>
          </div>
        </>
      ) : (
        // EXPANDED VIEW WITH SHANG-CHI SPLIT HOVER VIEW
        <div className="workshop-split-container">
          
          {/* Fixed split screen background image */}
          <div className="workshop-split-bg"></div>
 
          {/* Top Header Bar with Navigation buttons */}
          <div className="split-header-bar">
            <div className="split-header-left">
              <button className="back-to-teaser-btn" onClick={() => {
                if (activeSide !== null) {
                  setActiveSide(null);
                } else {
                  setIsOpen(false);
                  if (onToggleExpand) {
                    onToggleExpand(false);
                  }
                }
              }}>
                {activeSide !== null ? "← Back to Paths" : "← Back to Teaser"}
              </button>
            </div>
            <h2 className="split-page-title">CHOOSE YOUR PATH</h2>
          </div>
 
          {/* Split panels container */}
          <div 
            className="split-panels"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* LEFT PANEL: BLUE / CYBER SECURITY */}
            <div 
              className={`split-panel left-panel ${activeSide === "left" ? "expanded" : activeSide === "right" ? "shrunk" : ""}`}
              onClick={() => handlePanelClick("left")}
            >
              <div className="panel-bg-hover left-hover-bg"></div>
              <div className="panel-overlay blue-overlay"></div>
              
              <div className="panel-content">
                
                {activeSide !== "left" ? (
                  // Neutral View Content
                  <>
                    <div className="panel-glow-ring blue-ring"></div>
                    <span className="panel-side-tag">PATH OF DEFENSE</span>
                    
                    <ul className="neutral-workshop-list">
                      {defenseWorkshops.map((ws) => (
                        <li key={ws.id} className="neutral-workshop-item">
                          {ws.title}
                        </li>
                      ))}
                    </ul>

                    <div className="hover-prompt blue-prompt">
                      <span className="desktop-only-text">Hover to Acquire Power</span>
                      <span className="mobile-only-text">Tap to Acquire Power</span>
                    </div>
                  </>
                ) : (
                  // Expanded View (Show all 3 workshops side-by-side)
                  <div className="expanded-path-container">
                    <span className="panel-side-tag blue-tag-text">PATH OF DEFENSE</span>
                    <div className="expanded-workshops-grid">
                      {defenseWorkshops.map((ws) => (
                        <div key={ws.id} className="workshop-card blue-card">
                          <h4 className="card-ws-title">{ws.title}</h4>
                          <p className="card-ws-desc">{ws.description}</p>
                          
                          <div className="card-ws-metadata">
                            <div className="card-ws-tag">
                              <span>{ws.level}</span>
                            </div>
                            <div className="card-ws-tag">
                              <span>{ws.duration}</span>
                            </div>
                          </div>

                          <button className="register-now-split-btn blue-btn">
                            {ws.btnText}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
 
            {/* Sci-fi Divider Line */}
            <div className={`split-divider ${activeSide ? activeSide : ""}`}></div>
 
            {/* RIGHT PANEL: ORANGE / INTRO TO AI/ML */}
            <div 
              className={`split-panel right-panel ${activeSide === "right" ? "expanded" : activeSide === "left" ? "shrunk" : ""}`}
              onClick={() => handlePanelClick("right")}
            >
              <div className="panel-bg-hover right-hover-bg"></div>
              <div className="panel-overlay orange-overlay"></div>
              
              <div className="panel-content">
                
                {activeSide !== "right" ? (
                  // Neutral View Content
                  <>
                    <div className="panel-glow-ring orange-ring"></div>
                    <span className="panel-side-tag">PATH OF COGNITION</span>
                    
                    <ul className="neutral-workshop-list">
                      {cognitionWorkshops.map((ws) => (
                        <li key={ws.id} className="neutral-workshop-item">
                          {ws.title}
                        </li>
                      ))}
                    </ul>

                    <div className="hover-prompt orange-prompt">
                      <span className="desktop-only-text">Hover to Unleash Force</span>
                      <span className="mobile-only-text">Tap to Unleash Force</span>
                    </div>
                  </>
                ) : (
                  // Expanded View (Show all 3 workshops side-by-side)
                  <div className="expanded-path-container">
                    <span className="panel-side-tag orange-tag-text">PATH OF COGNITION</span>
                    <div className="expanded-workshops-grid">
                      {cognitionWorkshops.map((ws) => (
                        <div key={ws.id} className="workshop-card orange-card">
                          <h4 className="card-ws-title">{ws.title}</h4>
                          <p className="card-ws-desc">{ws.description}</p>
                          
                          <div className="card-ws-metadata">
                            <div className="card-ws-tag">
                              <span>{ws.level}</span>
                            </div>
                            <div className="card-ws-tag">
                              <span>{ws.duration}</span>
                            </div>
                          </div>

                          <button className="register-now-split-btn orange-btn">
                            {ws.btnText}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
 
          </div>
 
        </div>
      )}
 
    </section>
  );
}

export default Workshops;
