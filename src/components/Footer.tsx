import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import styles from './Footer.module.css';

// SVG components matching Lucide design language for brand icons
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.81 1.54V6.78a4.85 4.85 0 0 1-1.04-.09z" />
  </svg>
);

interface NavLinkItem {
  label: string;
  href: string;
}

interface ServiceItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

const SERVICES_LIST: ServiceItem[] = [
  { label: 'Marketing Digital', href: '#servicios' },
  { label: 'E-Commerce', href: '#servicios' },
  { label: 'Diseño Web', href: '#servicios' },
  { label: 'Branding', href: '#servicios' },
];

const CURRENT_YEAR = new Date().getFullYear();

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.mainGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Column 1: Brand & Social */}
          <motion.div className={styles.brandCol} variants={columnVariants}>
            <a href="#inicio" className={styles.logo} aria-label="Grupo Qadro Inicio">
              <span>GRUPO QADRO</span>
              <span className={styles.logoDot}>.</span>
            </a>

            <p className={styles.brandDescription}>
              En Qadro, somos expertos en marketing digital, e-commerce, producción
              de podcasts, creación de páginas web y videos. Potenciamos tu marca
              con soluciones creativas y efectivas.
            </p>

            <div className={styles.socialRow}>
              <motion.a
                href="https://www.instagram.com/grupoqadro/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram de Grupo Qadro"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <InstagramIcon className={styles.socialIcon} />
              </motion.a>

              <motion.a
                href="https://www.facebook.com/grupoqadro/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook de Grupo Qadro"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FacebookIcon className={styles.socialIcon} />
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@grupoqadro"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok de Grupo Qadro"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <TikTokIcon className={styles.socialIcon} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={columnVariants}>
            <h3 className={styles.columnTitle}>Enlaces</h3>
            <ul className={styles.linksList}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.navLink}>
                    <ChevronRight className={styles.linkArrow} />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={columnVariants}>
            <h3 className={styles.columnTitle}>Servicios</h3>
            <ul className={styles.linksList}>
              {SERVICES_LIST.map((service) => (
                <li key={service.label}>
                  <a href={service.href} className={styles.serviceItem}>
                    <span className={styles.serviceDot} aria-hidden="true" />
                    <span>{service.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={columnVariants}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <ul className={styles.contactList}>
              <li>
                <a
                  href="tel:4497551585"
                  className={`${styles.contactItem} ${styles.contactItemLink}`}
                >
                  <div className={styles.contactIconBox}>
                    <Phone className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Teléfono</span>
                    <span className={styles.contactValue}>449 755 15 85</span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:contacto@grupoquadro.com.mx"
                  className={`${styles.contactItem} ${styles.contactItemLink}`}
                >
                  <div className={styles.contactIconBox}>
                    <Mail className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Email</span>
                    <span className={styles.contactValue}>contacto@grupoquadro.com.mx</span>
                  </div>
                </a>
              </li>

              <li className={styles.contactItem}>
                <div className={styles.contactIconBox}>
                  <MapPin className={styles.contactIcon} />
                </div>
                <div className={styles.contactContent}>
                  <span className={styles.contactLabel}>Ubicación</span>
                  <span className={styles.contactValue}>
                    Del Arcoiris 211, Villas de la Cantera, 20200 Aguascalientes, Ags.
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Google Maps Embed Section */}
        <motion.div
          className={styles.mapWrapper}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.mapHeader}>
            <div className={styles.mapTitle}>
              <MapPin className={styles.mapPinBadge} />
              <span>Nuestras Oficinas en Aguascalientes</span>
            </div>
            <a
              href="https://maps.google.com/?q=Del+Arcoiris+211,+Villas+de+la+Cantera,+20200+Aguascalientes,+Ags."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              <span>Ver en Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className={styles.mapIframeContainer}>
            <iframe
              title="Ubicación de Grupo Qadro en Aguascalientes"
              src="https://maps.google.com/maps?q=Del+Arcoiris+211,+Villas+de+la+Cantera,+20200+Aguascalientes,+Ags.&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className={styles.mapIframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Bottom Bar: Copyright line */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              &copy; {CURRENT_YEAR} Grupo Qadro. Todos los derechos reservados.
            </p>
            <div className={styles.bottomLinks}>
              <a href="#privacidad" className={styles.bottomLink}>
                Aviso de Privacidad
              </a>
              <span aria-hidden="true">•</span>
              <a href="#terminos" className={styles.bottomLink}>
                Términos y Condiciones
              </a>
              <span aria-hidden="true">•</span>
              <span className={styles.bottomLink}>
                Aguascalientes, México
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient bottom border in red/gold */}
      <div className={styles.animatedBottomBorder} aria-hidden="true" />
    </footer>
  );
};

export default Footer;
