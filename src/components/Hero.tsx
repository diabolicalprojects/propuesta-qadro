import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, Star, Users, Clock } from 'lucide-react'
import styles from './Hero.module.css'

const WA_URL =
  'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

/* ── Image showcase ──────────────────────────────────────────────────── */
const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    alt: 'Equipo de marketing Qadro en sesión creativa',
    tag: 'Estrategia & Equipo',
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    alt: 'Analíticas y crecimiento de clientes Qadro',
    tag: 'Crecimiento Medible',
  },
  {
    url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop',
    alt: 'Lanzamiento de campañas digitales de alto impacto',
    tag: 'Campañas Digitales',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Producción de contenido audiovisual y podcasts',
    tag: 'Producción Audiovisual',
  },
]

/* ── Stats ───────────────────────────────────────────────────────────── */
const STATS = [
  { Icon: Users,      value: '250+', label: 'Clientes Reales' },
  { Icon: Star,       value: '4.7 ★', label: 'Calificación' },
  { Icon: TrendingUp, value: '+300%',label: 'ROI Promedio' },
  { Icon: Clock,      value: '16+',  label: 'Años Trayectoria' },
]

/* ── Fingerprint SVG Background ──────────────────────────────────────── */
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
        <circle cx="100" cy="100" r="5" fill="#E63946" fillOpacity="0.25" />
        <circle cx="100" cy="100" r="2" fill="#E63946" fillOpacity="0.45" />
      </g>
    </motion.svg>
  )
}

export const Hero: React.FC = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="inicio" className={styles.hero}>
      {/* Animated fingerprint background */}
      <div className={styles.fpBackground}>
        <FingerprintSubtle />
      </div>

      {/* Background ambient lighting */}
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={styles.glowRed} />
      <div className={styles.glowBlue} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ── LEFT COLUMN ───────────────────────────────────────── */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Headline */}
            <h1 className={styles.h1}>
              Tu negocio necesita{' '}
              <span className={styles.h1Red}>clientes,</span>
              <br />
              <span className={styles.h1Blue}>no publicaciones bonitas.</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.sub}>
              Convertimos estrategia, contenido y publicidad digital en citas agendadas y ventas reales para tu marca.
            </p>

            {/* Main CTAs */}
            <div className={styles.ctaRow}>
              <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Agendar cita de 15 minutos
              </motion.a>

              <a href="#servicios" className={styles.ctaSecondary}>
                Ver nuestros servicios <ArrowRight size={16} />
              </a>
            </div>

            {/* Clean Stats Strip */}
            <div className={styles.statsRow}>
              {STATS.map(({ value, label }) => (
                <div key={label} className={styles.statItem}>
                  <strong className={styles.statValue}>{value}</strong>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — Clean Showcase Card ────────────────── */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.cardFrame}>
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
                  <div className={styles.dotsRow}>
                    {HERO_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.dot} ${
                          idx === currentImgIndex ? styles.dotActive : ''
                        }`}
                        onClick={() => setCurrentImgIndex(idx)}
                        aria-label={`Ver imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
