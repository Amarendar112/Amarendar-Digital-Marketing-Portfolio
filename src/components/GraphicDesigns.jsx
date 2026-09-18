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
import d7 from '../assets/layyr-brand-preview.webp';
import p1 from '../assets/product-design-work/6645b0867dfcf14cab22684a3bc7d7c1.jpg';
import p2 from '../assets/product-design-work/70e2291cd28dc4da846dc1c20c0dce93.jpg';
import p3 from '../assets/product-design-work/Visit Happi Mobiles.png';
import p4 from '../assets/product-design-work/crcs.jpg';

const designs = [
  { id: 1, src: d1, title: 'Sturm Skincare Product UI',     tag: 'Product UI'          },
  { id: 2, src: d2, title: 'Floral Apparel Ad Poster',       tag: 'Social Media Design' },
  { id: 3, src: d3, title: '3D Portfolio Showcase Poster',  tag: '3D & Visual Design'  },
  { id: 4, src: d4, title: 'Coca-Cola Ad Poster Concept',    tag: 'Brand Advertising'   },
  { id: 5, src: d5, title: 'Delicious Pizza Poster',         tag: 'Food Poster Design'  },
  { id: 6, src: d6, title: 'MuscleBlaze Protein Ad Poster',  tag: 'Fitness Brand Poster'},
  { id: 7, src: d7, title: 'Layyr | Pre-Launch Poster Design', tag: 'Freelance Work'    },
  { id: 8, src: p1, title: 'Product Design Concept 01',    tag: 'Product Design'      },
  { id: 9, src: p2, title: 'Product Design Concept 02',    tag: 'Product Design'      },
  { id: 10, src: p3, title: 'Visit Happi Mobiles',         tag: 'Product Design'      },
  { id: 11, src: p4, title: 'CRCS Product Visual',         tag: 'Product Design'      },
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
          <div className="lb-img-wrap">
            <img src={design.src} alt={design.title} className="lb-img" />
          </div>
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
