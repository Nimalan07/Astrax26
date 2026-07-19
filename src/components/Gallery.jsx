import React, { useState, useRef } from 'react';
import '../styles/Gallery.css';

import galleryBg  from '../assets/gallery-bg.webp';
import portalsImg from '../assets/new_portals1.webp';
import b1 from '../assets/b1.webp';
import b2 from '../assets/b2.webp';

// Eager-load all gallery images
const gallery1 = Object.values(import.meta.glob('../assets/gallery1/*.webp', { eager: true, import: 'default' }));
const gallery2 = Object.values(import.meta.glob('../assets/gallery2/*.webp', { eager: true, import: 'default' }));

// ── Gallery Categories ──────────────────────────────────────────────────────────
const SLIDES = [
  { id: 'club',     title: 'Club Inauguration', images: gallery1, btn: b1, btnW: '60px' },
  { id: 'ideathon', title: 'Ideathon',          images: gallery2, btn: b2, btnW: '60px' },
];

const Gallery = () => {
  const bgRef = useRef(null);

  // Active category index (0 = Club Inauguration, 1 = Ideathon)
  const [slideIdx, setSlideIdx] = useState(0);

  // Per-category image index
  const [imgIdx, setImgIdx] = useState(SLIDES.map(() => 0));

  // Switch to previous category
  const handlePrevSlide = () => {
    setSlideIdx(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Switch to next category
  const handleNextSlide = () => {
    setSlideIdx(prev => (prev + 1) % SLIDES.length);
  };

  // Advance photo for current category
  const handleNextImage = (sIdx) => {
    setImgIdx(prev => {
      const next = [...prev];
      next[sIdx] = (next[sIdx] + 1) % SLIDES[sIdx].images.length;
      return next;
    });
  };

  const currentSlide = SLIDES[slideIdx];

  return (
    <div className="gallery-page">
      {/* Fixed background */}
      <div className="gallery-bg" ref={bgRef} style={{ backgroundImage: `url(${galleryBg})` }} />
      <div className="gallery-overlay" />

      {/* Floating embers */}
      <div className="embers-layer" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="ember" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            '--max-opacity': 0.1 + Math.random() * 0.3,
            '--drift': Math.random(),
          }} />
        ))}
      </div>

      {/* ── Main Gallery Frame Container ───────────────────────────────────────── */}
      <div className="center-portals-container">
        <div className="portal-display-container">
          
          {/* Frame Wrapper with perfectly aligned arrows */}
          <div className="portal-frame-wrapper">
            <div className="gallery-nav-arrow left" onClick={handlePrevSlide} title="Previous Category">
              &lt;
            </div>

            <div className="portal-content">
              <div className="portal-content-inner">
                <div
                  className="image-slider-track"
                  style={{ transform: `translateX(-${imgIdx[slideIdx] * 100}%)` }}
                >
                  {currentSlide.images.map((src, idx) => (
                    <img key={idx} src={src} alt={`${currentSlide.title} ${idx + 1}`} />
                  ))}
                </div>
              </div>
              <img src={portalsImg} alt="Frame" className="portal-frame-individual" />
            </div>

            <div className="gallery-nav-arrow right" onClick={handleNextSlide} title="Next Category">
              &gt;
            </div>
          </div>
          
          <h2 className="gallery-slide-title">{currentSlide.title}</h2>

          <div className="portal-btn">
            <img
              src={currentSlide.btn}
              alt="Next image"
              className="rune-btn"
              style={{ width: currentSlide.btnW }}
              onClick={() => handleNextImage(slideIdx)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Gallery;