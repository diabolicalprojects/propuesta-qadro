import React from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, Settings, BarChart2, ArrowRight } from 'lucide-react'
import FingerprintBg from './FingerprintBg'
import styles from './Process.module.css'

interface ProcessStep {
  num: string
  title: string
  desc: string
  icon: React.ReactNode
}

const steps: ProcessStep[] = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Conocemos tu negocio, objetivos y áreas de oportunidad clave.',
    icon: <Search size={22} />,
  },
  {
    num: '02',
    title: 'Estrategia',
    desc: 'Diseñamos un plan de acción personalizado orientado a métricas reales.',
    icon: <FileText size={22} />,
  },
  {
    num: '03',
    title: 'Ejecución',
    desc: 'Creamos contenido visual impactante, programamos y optimizamos campañas.',
    icon: <Settings size={22} />,
  },
  {
    num: '04',
    title: 'Medición',
    desc: 'Analizamos los datos de tráfico y escalamos los canales que venden.',
    icon: <BarChart2 size={22} />,
  },
]

const howSteps = [
  {
    num: '01',
    title: 'Envío de Mensaje',
    desc: 'Envía un mensaje a nuestro WhatsApp donde un ejecutivo te responderá a la brevedad.',
    accentColor: '#D4AF37',
  },
  {
    num: '02',
    title: 'Agendamiento',
    desc: 'Tu ejecutivo coordinará una cita presencial o por videollamada a la hora que mejor te acomode.',
    accentColor: '#E63946',
  },
  {
    num: '03',
    title: 'Sesión Estratégica',
    desc: 'Asistes a la cita para conocer la hoja de ruta y descubrir cómo sucede la magia.',
    accentColor: '#0037FF',
  },
]

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

export const Process: React.FC = () => {
  return (
    <section id="proceso" className={styles.section}>
      <FingerprintBg
        color="#E63946"
        opacity={0.04}
        size={700}
        animate={false}
        style={{ top: '20%', left: '-150px', zIndex: 0 }}
      />

      <div className={styles.container}>
        {/* Step 1: Resultados Reales */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>RESULTADOS REALES</span>
          <h2 className={styles.title}>Así hacemos crecer tu negocio.</h2>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.stepCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.stepBadge}>{s.num}</div>
              <div className={styles.stepIcon}>{s.icon}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Step 2: Cómo Funciona (3 Colored Accent Cards) */}
        <div className={styles.howWrapper}>
          <div className={styles.headerCenter}>
            <span className={styles.eyebrowBlue}>CÓMO FUNCIONA</span>
            <h2 className={styles.titleHow}>
              De la cita a tu estrategia, en tres pasos.
            </h2>
          </div>

          <div className={styles.howGrid}>
            {howSteps.map((h, i) => (
              <motion.div
                key={h.num}
                className={styles.howCard}
                style={{ borderTopColor: h.accentColor }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <span className={styles.howNum} style={{ color: h.accentColor }}>{h.num}</span>
                <h3 className={styles.howCardTitle}>{h.title}</h3>
                <p className={styles.howCardDesc}>{h.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Centered Action Button */}
          <div className={styles.ctaWrapper}>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.agendaBtn}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Agenda tu cita ahora</span>
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
