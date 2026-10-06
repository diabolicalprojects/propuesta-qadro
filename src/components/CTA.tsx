import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import FingerprintBg from './FingerprintBg'
import styles from './CTA.module.css'

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

export const CTA: React.FC = () => {
  return (
    <section id="contacto" className={styles.section}>
      <FingerprintBg
        color="#FFFFFF"
        opacity={0.07}
        size={800}
        animate={true}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.contentBox}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>¿LISTO PARA MULTIPLICAR TUS VENTAS?</span>
          <h2 className={styles.title}>¡No dejes pasar esta oportunidad!</h2>
          <p className={styles.subtext}>
            Invierte en un buen diseño, invierte en buen contenido.<br />
            Agenda una sesión de 15 minutos y analicemos tu marca sin costo.
          </p>

          <div className={styles.ctaRow}>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whiteBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Contáctanos por WhatsApp</span>
              <ArrowRight size={18} />
            </motion.a>
          </div>

          <div className={styles.trustBadges}>
            <span><CheckCircle2 size={14} /> Respuesta en &lt; 1 hora</span>
            <span><CheckCircle2 size={14} /> Sin compromiso</span>
            <span><CheckCircle2 size={14} /> Asesoría 1:1 personalizada</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
