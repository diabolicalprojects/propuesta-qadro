import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import styles from './Hero.module.css'

const WA_URL = 'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

// Hero image carousel data
const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    alt: 'Equipo de marketing Qadro en sesión creativa',
    tag: 'Estrategia & Equipo · Qadro',
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    alt: 'Analíticas y crecimiento de clientes Qadro',
    tag: 'Crecimiento Medible · +300% ROI',
  },
  {
    url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop',
    alt: 'Lanzamiento de campañas digitales de alto impacto',
    tag: 'Campañas Digitales & Ads',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Producción de contenido audiovisual y podcasts',
    tag: 'Branding & Producción Audiovisual',
  },
]

// Soft, elegant fingerprint SVG with continuous rotation & subtle drop shadow blur
function FingerprintSubtle() {
  const rings = [44, 38, 32, 26, 20, 14, 8]
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={styles.fpSvg}
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <radialGradient id="fpGradHero" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E63946" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#E63946" stopOpacity="0" />
        </radialGradient>
        <filter id="fpBlurHero" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#fpGradHero)" />
      <g filter="url(#fpBlurHero)">
        {rings.map((r, i) => (
          <ellipse
            key={r}
            cx="100"
            cy="100"
            rx={r * 2.2}
            ry={r * 2.8}
            stroke="#E63946"
            strokeWidth={i === 0 ? 2 : 1.3}
            fill="none"
            strokeDasharray={i % 2 === 0 ? '18 8' : '28 6'}
            strokeOpacity={0.24 - i * 0.02}
            transform={`rotate(${25 + i * 3} 100 100)`}
          />
        ))}
        {/* centre whorl */}
        <circle cx="100" cy="100" r="5" fill="#E63946" fillOpacity="0.25" />
        <circle cx="100" cy="100" r="2" fill="#E63946" fillOpacity="0.45" />
      </g>
    </motion.svg>
  )
}

// Floating dashboard cards (right column)
const floatingCards = [
  {
    key: 'traffic',
    style: { top: '12%', left: '-4%' },
    delay: 0,
    yAnim: [0, -10, 0],
    content: (
      <>
        <p className={styles.cardMicro}>Blog Traffic <span className={styles.up}>↑ 16.5%</span></p>
        <p className={styles.cardBig}>125,536</p>
        <p className={styles.cardSub}>Desde la semana pasada</p>
      </>
    ),
  },
  {
    key: 'seo',
    style: { bottom: '12%', left: '-2%' },
    delay: 1,
    yAnim: [0, 10, 0],
    content: (
      <>
        <p className={styles.cardMicro}>SEO Analytics <span className={styles.up}>↑ 20%</span></p>
        <div className={styles.progressOuter}>
          <div className={styles.progressInner} />
        </div>
        <p className={styles.cardBig} style={{ fontSize: '20px' }}>80%</p>
      </>
    ),
  },
  {
    key: 'ai',
    style: { top: '8%', right: '-4%' },
    delay: 0.5,
    yAnim: [0, -8, 0],
    content: (
      <span className={styles.aiBadge}>✦ Estrategia Digital</span>
    ),
  },
]

export const Hero: React.FC = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  // Auto-advance slideshow every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="inicio" className={styles.hero}>
      {/* Full-bleed animated fingerprint background */}
      <div className={styles.fpBackground}>
        <FingerprintSubtle />
      </div>

      {/* Ambient glow blobs */}
      <div className={styles.glowRed} />
      <div className={styles.glowBlue} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ── LEFT COLUMN ── */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pill badge */}
            <div className={styles.pill}>
              <span className={styles.pillDot} />
              #1 Agencia de Marketing Digital — Aguascalientes
            </div>

            {/* Headline */}
            <h1 className={styles.h1}>
              Tu negocio
              <br />
              necesita <span className={styles.h1Red}>clientes,</span>
              <br />
              <span className={styles.h1Blue}>no publicaciones bonitas.</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.sub}>
              En Grupo Quadro convertimos estrategia, contenido y publicidad en citas agendadas y ventas reales.{' '}
              <strong>Agenda una cita de 15 minutos</strong> y te decimos qué está frenando tu negocio.
            </p>

            {/* CTAs */}
            <div className={styles.ctaRow}>
              <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Agendar mi cita gratis
              </motion.a>

              <a href="#trabajo" className={styles.ctaSecondary}>
                Ver casos de éxito <ArrowRight size={16} />
              </a>
            </div>

            {/* Micro-trust */}
            <p className={styles.trust}>
              Respuesta en menos de 1 hora · Sin compromiso · Presencial o videollamada
            </p>
          </motion.div>

          {/* ── RIGHT COLUMN — Floating card stack with image slideshow ── */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.cardStack}>
              {/* Main photo card with dynamic slideshow transition */}
              <div className={styles.mainCard}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={HERO_IMAGES[currentImgIndex].url}
                    src={HERO_IMAGES[currentImgIndex].url}
                    alt={HERO_IMAGES[currentImgIndex].alt}
                    className={styles.mainCardImg}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                <div className={styles.mainCardOverlay}>
                  <span className={styles.overlayTag}>
                    {HERO_IMAGES[currentImgIndex].tag}
                  </span>

                  {/* Carousel progress dots */}
                  <div className={styles.dotsRow}>
                    {HERO_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.dot} ${idx === currentImgIndex ? styles.dotActive : ''}`}
                        onClick={() => setCurrentImgIndex(idx)}
                        aria-label={`Ver imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating dashboard badges */}
              {floatingCards.map((fc) => (
                <motion.div
                  key={fc.key}
                  className={styles.floatCard}
                  style={fc.style as React.CSSProperties}
                  animate={{ y: fc.yAnim }}
                  transition={{ duration: 4 + fc.delay, repeat: Infinity, ease: 'easeInOut', delay: fc.delay }}
                >
                  {fc.content}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
