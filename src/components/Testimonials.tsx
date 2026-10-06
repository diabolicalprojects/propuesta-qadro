import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import styles from './Testimonials.module.css'

interface TestimonialItem {
  clientName: string
  subtitle: string
  text: string
  rating: number
  initials: string
}

const testimonialsData: TestimonialItem[] = [
  {
    clientName: 'El Cerrito',
    subtitle: 'Casa de Empeño',
    text: 'Súper profesionales y comprometidos. Desde que iniciamos la estrategia digital con Qadro el flujo de clientes ha sido constante.',
    rating: 5,
    initials: 'EC',
  },
  {
    clientName: 'Culinary Hub',
    subtitle: 'Gastronomía & Restaurantes',
    text: 'Muy trabajadores y profesionales. Entendieron perfecto la esencia visual de nuestro concepto.',
    rating: 5,
    initials: 'CH',
  },
  {
    clientName: 'Ola Gastronomía',
    subtitle: 'Experiencias Gastronómicas',
    text: 'Hasta ahora muy satisfecha con el servicio, excelente el trato, saben del tema, me han ahorrado mucho trabajo. Vale la pena el costo del servicio, es mi segunda renovación. ¡RECOMENDABLE!',
    rating: 5,
    initials: 'OG',
  },
]

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>LO QUE DICEN NUESTROS CLIENTES</span>
          <h2 className={styles.title}>Resultados que hablan por nosotros.</h2>
        </div>

        <div className={styles.grid}>
          {testimonialsData.map((item, i) => (
            <motion.div
              key={item.clientName}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Quote className={styles.quoteIcon} size={32} />

              <div className={styles.starsRow}>
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="#E63946" color="#E63946" />
                ))}
              </div>

              <p className={styles.cardText}>"{item.text}"</p>

              <div className={styles.cardFooter}>
                <div className={styles.avatarBadge}>{item.initials}</div>
                <div>
                  <h3 className={styles.clientName}>{item.clientName}</h3>
                  <p className={styles.clientSubtitle}>{item.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
