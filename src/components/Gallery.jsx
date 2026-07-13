import React, { useState, useRef } from 'react';
import '../styles/Gallery.css';

// Background image
import galleryBg from '../assets/gallery-bg.webp';
// Portals image
import portalsImg from '../assets/new_portals1.webp';
// Title image
import galleryTitleImg from '../assets/gallery-title.webp';

// Buttons
import b1 from '../assets/b1.webp';
import b2 from '../assets/b2.webp';
import b3 from '../assets/b3.webp';

// Dynamically import all optimized webp images from the gallery directories
const leftImages = Object.values(import.meta.glob('../assets/gallery1/*.webp', { eager: true, import: 'default' }));
const centerImages = Object.values(import.meta.glob('../assets/gallery2/*.webp', { eager: true, import: 'default' }));
const rightImages = Object.values(import.meta.glob('../assets/gallery3/*.webp', { eager: true, import: 'default' }));

/* ── Gallery Page ── */
const Gallery = () => {
  const bgRef = useRef(null);

  const [leftIndex, setLeftIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const nextLeft = () => {
    if (leftImages.length > 0) {
      setLeftIndex((prev) => (prev + 1) % leftImages.length);
    }
  };
  const nextCenter = () => {
    if (centerImages.length > 0) {
      setCenterIndex((prev) => (prev + 1) % centerImages.length);
    }
  };
  const nextRight = () => {
    if (rightImages.length > 0) {
      setRightIndex((prev) => (prev + 1) % rightImages.length);
    }
  };

  return (
    <div className="gallery-page">
      {/* Background image layer (parallax) */}
      <div className="gallery-bg" ref={bgRef} style={{ backgroundImage: `url(${galleryBg})` }}></div>
      <div className="gallery-overlay"></div>

      {/* Floating embers (optional, kept for vibe) */}
      <div className="embers-layer" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="ember" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            '--max-opacity': 0.1 + Math.random() * 0.3,
            '--drift': Math.random()
          }}></span>
        ))}
      </div>

      {/* Center Portals Container */}
      <div className="center-portals-container">
        <img src={galleryTitleImg} alt="Gallery" className="gallery-main-title-img" />

        <div className="portals-wrapper">
          <div className="portal-wrapper-mobile">
            <div className="portal-content portal-left">
              <div className="portal-content-inner" onClick={nextLeft}>
                {leftImages.map((img, idx) => (
                  <img 
                    key={`left-${idx}`} 
                    src={img} 
                    alt={`Gallery 1 Image ${idx + 1}`} 
                    className={leftIndex === idx ? 'active-image' : 'inactive-image'}
                  />
                ))}
              </div>
              <img src={portalsImg} alt="Frame" className="portal-frame-individual" />
            </div>
            <div className="portal-btn-mobile">
              <img src={b1} alt="Left Control" className="rune-btn" style={{ width: '55.5px' }} onClick={nextLeft} />
            </div>
          </div>
          <div className="portal-wrapper-mobile">
            <div className="portal-content portal-center">
              <div className="portal-content-inner" onClick={nextCenter}>
                {centerImages.map((img, idx) => (
                  <img 
                    key={`center-${idx}`} 
                    src={img} 
                    alt={`Gallery 2 Image ${idx + 1}`} 
                    className={centerIndex === idx ? 'active-image' : 'inactive-image'}
                  />
                ))}
              </div>
              <img src={portalsImg} alt="Frame" className="portal-frame-individual" />
            </div>
            <div className="portal-btn-mobile">
              <img src={b2} alt="Center Control" className="rune-btn" onClick={nextCenter} />
            </div>
          </div>
          <div className="portal-wrapper-mobile">
            <div className="portal-content portal-right">
              <div className="portal-content-inner" onClick={nextRight}>
                {rightImages.map((img, idx) => (
                  <img 
                    key={`right-${idx}`} 
                    src={img} 
                    alt={`Gallery 3 Image ${idx + 1}`} 
                    className={rightIndex === idx ? 'active-image' : 'inactive-image'}
                  />
                ))}
              </div>
              <img src={portalsImg} alt="Frame" className="portal-frame-individual" />
            </div>
            <div className="portal-btn-mobile">
              <img src={b3} alt="Right Control" className="rune-btn" style={{ width: '42.8px' }} onClick={nextRight} />
            </div>
          </div>
          
          <img src={portalsImg} alt="Portals Frame" className="portals-frame" />
          
          <div className="gallery-controls">
             <div className="gallery-control-item" style={{ left: '19.14%' }}>
               <img src={b1} alt="Left Control" className="rune-btn" style={{ width: '55.5px' }} onClick={nextLeft} />
             </div>
             <div className="gallery-control-item" style={{ left: '50%' }}>
               <img src={b2} alt="Center Control" className="rune-btn" onClick={nextCenter} />
             </div>
             <div className="gallery-control-item" style={{ left: '80.85%' }}>
               <img src={b3} alt="Right Control" className="rune-btn" style={{ width: '42.8px' }} onClick={nextRight} />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Gallery;