import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimatedServiceCard from '../remotion/AnimatedServiceCard'
import { SERVICE_CARDS } from '../remotion/serviceCardDefinitions'
import styles from './Services.module.css'

interface ServiceItem {
  num: string
  title: string
  desc: string
  icon: string
  tag: string
  dark?: boolean
}

const servicesList: ServiceItem[] = [
  {
    num: '01',
    title: 'Manejo de Redes Sociales',
    desc: 'Contenido estratégico que conecta y atrae clientes reales. Crecimiento orgánico y contenido visual cautivador.',
    icon: 'social',
    tag: 'CONTENIDO & COMMUNITY',
    dark: false,
  },
  {
    num: '02',
    title: 'Publicidad Digital (Ads)',
    desc: 'Campañas de alto rendimiento en Meta Ads y Google Ads enfocadas exclusivamente en conversión y ROI.',
    icon: 'marketing',
    tag: 'TRÁFICO & VENTAS',
    dark: true,
  },
  {
    num: '03',
    title: 'Diseño & Desarrollo Web',
    desc: 'Sitios web modernos, ultrarrápidos y optimizados para convertir visitantes en prospectos calificados.',
    icon: 'web',
    tag: 'WEB & E-COMMERCE',
    dark: false,
  },
  {
    num: '04',
    title: 'Diseño & Branding',
    desc: 'Identidad visual memorable. La gente es muy visual, creamos marcas que destacan de la competencia.',
    icon: 'branding',
    tag: 'IDENTIDAD DE MARCA',
    dark: true,
  },
  {
    num: '05',
    title: 'Producción Audiovisual',
    desc: 'Fotografía comercial y producción de video profesional para redes sociales y campañas publicitarias.',
    icon: 'video',
    tag: 'FOTO & VIDEO REELS',
    dark: false,
  },
  {
    num: '06',
    title: 'Ventas en Línea & E-Commerce',
    desc: 'Tiendas online diseñadas para que la gente encuentre rápido lo que busca y pague sin complicaciones.',
    icon: 'ecommerce',
    tag: 'E-COMMERCE 360°',
    dark: true,
  },
]

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

export const Services: React.FC = () => {
  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>NUESTROS SERVICIOS</span>
          <h2 className={styles.title}>
            Todo lo que necesita tu negocio<br />para crecer en un solo lugar.
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          {servicesList.map((service, i) => (
            <motion.div
              key={service.title}
              className={`${styles.bentoCard} ${service.dark ? styles.darkCard : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{service.tag}</span>
                <span className={styles.cardNum}>{service.num}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.iconBox} aria-hidden="true">
                  <AnimatedServiceCard
                    card={SERVICE_CARDS.find(({ id }) => id === service.icon)!}
                    size={64}
                    isDark={service.dark}
                  />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
              </div>

              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.cardLink}
              >
                <span>Consultar servicio</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
