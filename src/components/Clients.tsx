import React from 'react'
import { motion } from 'framer-motion'
import styles from './Clients.module.css'

const CDN = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=200,fit=crop/A1awRB78EbUDM68a/'

const clients = [
  { name: 'Maxiplas',        file: 'maxiplas-logotipo-PebQ723lqDeVt7c4.png' },
  { name: 'Protexum',        file: 'logonew021-WtG0E10xwgrbX7t0.png' },
  { name: 'SETEPROF',        file: 'recurso-66-300x-8-DuZDvKWwmGYX2tkU.png' },
  { name: 'Colchas Primavera', file: 'logo-colchas-wXWapI6JYemtnUl5.png' },
  { name: 'El Cerrito',      file: 'logo-cerrito-60edc20cba837-EvKNUIVGvIaqOAYf.png' },
  { name: 'Culinary Hub',    file: 'logo-culinary-01-mkyY7l7kEQx5Kd5q.png' },
  { name: 'Digital Noise',   file: 'logo-digital-noise-t7XM0Oe1QKUE53zc.png' },
  { name: 'ORDAQ',           file: 'logo-ordaq-2kfU3CHxdW353VT6.png' },
  { name: 'Grupo Nafe',      file: 'nafe-negro-W6n026hNoLBovrPV.png' },
]

const results = [
  {
    metric: '+300%',
    label: 'tráfico orgánico',
    who: 'El Cerrito',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  },
  {
    metric: '×4',
    label: 'retorno publicitario',
    who: 'Culinary Hub',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop',
  },
  {
    metric: '+800',
    label: 'leads en 90 días',
    who: 'Maxiplas',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop',
  },
]

export const Clients: React.FC = () => (
  <section id="trabajo" className={styles.section}>
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.eyebrow}>NUESTRO TRABAJO</span>
        <h2 className={styles.title}>
          Marcas que crecen<br />
          <span className={styles.titleAccent}>con Qadro.</span>
        </h2>
        <p className={styles.subtext}>
          Desde pymes locales hasta marcas regionales. Estrategia real, resultados medibles.
        </p>
      </motion.div>

      {/* Logos strip — NO containers, plain img tags */}
      <motion.div
        className={styles.logoStrip}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {clients.map((c) => (
          <img
            key={c.name}
            src={`${CDN}${c.file}`}
            alt={c.name}
            className={styles.logo}
            loading="lazy"
            title={c.name}
          />
        ))}
      </motion.div>

      {/* Results cards */}
      <div className={styles.resultsGrid}>
        {results.map((r, i) => (
          <motion.div
            key={r.who}
            className={styles.resultCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <div className={styles.resultImgWrap}>
              <img src={r.img} alt={r.label} className={styles.resultImg} loading="lazy" />
              <div className={styles.resultOverlay} />
            </div>
            <div className={styles.resultBody}>
              <span className={styles.resultMetric}>{r.metric}</span>
              <span className={styles.resultLabel}>{r.label}</span>
              <span className={styles.resultWho}>— {r.who}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Clients
