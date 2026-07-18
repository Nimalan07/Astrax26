import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/Gallery.css';

import galleryBg  from '../assets/gallery-bg.webp';
import portalsImg from '../assets/framephoto.png';
import b1 from '../assets/b1.webp';
import b2 from '../assets/b2.webp';
import b3 from '../assets/b3.webp';

// Eager-load all gallery images
const gallery1 = Object.values(import.meta.glob('../assets/gallery1/*.webp', { eager: true, import: 'default' }));
const gallery2 = Object.values(import.meta.glob('../assets/gallery2/*.webp', { eager: true, import: 'default' }));
const gallery3 = Object.values(import.meta.glob('../assets/gallery3/*.webp', { eager: true, import: 'default' }));

// ── Real slides data ──────────────────────────────────────────────────────────
const SLIDES = [
  { title: 'Club Inauguration', images: gallery1, btn: b1, btnW: '60px' },
  { title: 'Ideathon',          images: gallery2, btn: b2, btnW: '60px' },
  { title: 'Project Expo',      images: gallery3, btn: b3, btnW: '48px' },
];

// Loop array: [clone-of-last, ...real, clone-of-first]
// Indices:       0               1  2  3         4
const LOOP = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];
const FIRST_REAL = 1;
const LAST_REAL  = SLIDES.length; // == 3

const Gallery = () => {
  const bgRef    = useRef(null);
  const sliderRef = useRef(null);

  // Per-real-slide image indices
  const [imgIdx, setImgIdx] = useState(SLIDES.map(() => 0));

  // Which LOOP index is currently centred (start on first real slide)
  const [active, setActive] = useState(FIRST_REAL);

  // Flag to suppress the scroll handler while we do a silent jump
  const jumping = useRef(false);

  // ── Scroll a specific loop index into view ──────────────────────────────────
  const goTo = useCallback((loopIdx, behavior = 'smooth') => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: el.offsetWidth * loopIdx, behavior });
  }, []);

  // Initialise without animation to first real slide
  useEffect(() => {
    goTo(FIRST_REAL, 'instant');
  }, [goTo]);

  // ── Scroll handler: track active slide + silent loop-jump ───────────────────
  const onScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el || jumping.current) return;

    const slideW  = el.offsetWidth;
    const current = Math.round(el.scrollLeft / slideW);

    setActive(current);

    if (current === 0) {
      // Swiped past the beginning → jump silently to real last slide
      jumping.current = true;
      requestAnimationFrame(() => {
        goTo(LAST_REAL, 'instant');
        setActive(LAST_REAL);
        jumping.current = false;
      });
    } else if (current === LOOP.length - 1) {
      // Swiped past the end → jump silently to real first slide
      jumping.current = true;
      requestAnimationFrame(() => {
        goTo(FIRST_REAL, 'instant');
        setActive(FIRST_REAL);
        jumping.current = false;
      });
    }
  }, [goTo]);

  // ── Map a LOOP index to the real SLIDES index ───────────────────────────────
  const realIdx = (loopIdx) => {
    if (loopIdx === 0)              return SLIDES.length - 1; // clone of last
    if (loopIdx === LOOP.length - 1) return 0;                // clone of first
    return loopIdx - 1;
  };

  // ── Advance image for the currently active slide ────────────────────────────
  const handleNextImage = useCallback((ri) => {
    setImgIdx(prev => {
      const next = [...prev];
      next[ri] = (next[ri] + 1) % SLIDES[ri].images.length;
      return next;
    });
  }, []);

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

      {/* ── Carousel ─────────────────────────────────────────────────────────── */}
      <div className="center-portals-container">
        <div className="portals-slider" ref={sliderRef} onScroll={onScroll}>
          {LOOP.map((slide, li) => {
            const ri       = realIdx(li);
            const isActive = li === active;

            return (
              <div
                key={li}
                className={`portal-slide ${isActive ? 'active' : 'inactive'}`}
              >
                <div className="portal-content">
                  <div className="portal-content-inner">
                    <div
                      className="image-slider-track"
                      style={{ transform: `translateX(-${imgIdx[ri] * 100}%)` }}
                    >
                      {slide.images.map((src, idx) => (
                        <img key={idx} src={src} alt={`${slide.title} ${idx + 1}`} />
                      ))}
                    </div>
                  </div>
                  <img src={portalsImg} alt="Frame" className="portal-frame-individual" />
                </div>
                
                <h2 className="gallery-slide-title">{slide.title}</h2>

                <div className="portal-btn">
                  <img
                    src={slide.btn}
                    alt="Next image"
                    className={`rune-btn ${isActive ? '' : 'rune-btn--dim'}`}
                    style={{ width: slide.btnW }}
                    onClick={isActive ? () => handleNextImage(ri) : undefined}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;