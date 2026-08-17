import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Design images ─────────────────────────────────────────────────────────────
import d1 from '../assets/design-withamar.png';
import d2 from '../assets/design-withamar1.png';
import d3 from '../assets/design-withamar2.png';
import d4 from '../assets/design-withamar5.png';
import d5 from '../assets/design-withamar6.png';
import d6 from '../assets/design-untitled3.png';

const designs = [
  { id: 1, src: d1, title: 'Healthcare | Doctor UI',                                          tag: 'UI Design'   },
  { id: 2, src: d2, title: 'QuickSlices Pizza App',                                           tag: 'App Design'  },
  { id: 3, src: d3, title: 'Zomato Redesign',                                                 tag: 'UI/UX'       },
  { id: 4, src: d4, title: 'Trenzly',                                                         tag: 'Branding'    },
  { id: 5, src: d5, title: 'Joe & Sera | Interior Design Studio',                             tag: 'Brand Design'},
  { id: 6, src: d6, title: 'AI Dengue Detection Using CBC Data with Decision Tree Algorithm', tag: 'Research'    },
];

// Two copies — animate -50% for a perfectly seamless loop
const marqueeItems = [...designs, ...designs];

/* ── Lightbox ────────────────────────────────────────────────────────────────── */
const Lightbox = ({ designs, activeIndex, onClose, onNav }) => {
  const design = designs[activeIndex];
  return (
    <motion.div
      className="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button className="lb-close" onClick={onClose} aria-label="Close"><X size={22} /></button>

      <button
        className="lb-arrow lb-arrow--left"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous"
      >
        <ChevronLeft size={28} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="lb-panel"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={design.src} alt={design.title} className="lb-img" />
          <div className="lb-caption">
            <span className="gd-tag">{design.tag}</span>
            <p className="lb-caption-title">{design.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className="lb-arrow lb-arrow--right"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next"
      >
        <ChevronRight size={28} />
      </button>

      <div className="lb-dots">
        {designs.map((_, i) => (
          <button
            key={i}
            className={`lb-dot ${i === activeIndex ? 'lb-dot--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onNav(i - activeIndex); }}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ── Main Section ────────────────────────────────────────────────────────────── */
export default function GraphicDesigns() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox  = (i) => setLightboxIndex(i % designs.length);
  const closeLightbox = () => setLightboxIndex(null);
  const navLightbox   = (delta) =>
    setLightboxIndex((prev) => (prev + delta + designs.length) % designs.length);

  return (
    <section id="graphic-designs" className="gd-section">

      {/* Section heading */}
      <motion.div
        className="gd-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="gd-eyebrow">Creative Work</p>
        <h2 className="gd-h2">
          Graphic&nbsp;<span className="gd-accent">Designs</span>
        </h2>
        <p className="gd-subtitle">
          A curated collection of UI explorations, brand visuals, and product design work.
        </p>
      </motion.div>

      {/* ── Infinite marquee strip ─────────────────────────────────────────── */}
      <div className="gd-marquee-wrapper">
        {/* Left fade */}
        <div className="gd-marquee-fade gd-marquee-fade--left" />

        <div className="gd-marquee-track">
          <div className="gd-marquee-inner">
            {marqueeItems.map((design, i) => (
              <button
                key={i}
                className="gd-marquee-card"
                onClick={() => openLightbox(i)}
                aria-label={`Open ${design.title}`}
              >
                <img
                  src={design.src}
                  alt={design.title}
                  className="gd-marquee-img"
                  loading="lazy"
                  draggable="false"
                />
                <div className="gd-marquee-overlay">
                  <span className="gd-tag">{design.tag}</span>
                  <p className="gd-marquee-title">{design.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right fade */}
        <div className="gd-marquee-fade gd-marquee-fade--right" />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            designs={designs}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
