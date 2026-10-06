import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WhatsAppButton.module.css';

export interface WhatsAppButtonProps {
  /** Phone number in international format without symbols (e.g. 524497551585). Default: '524497551585' */
  phoneNumber?: string;
  /** Pre-filled message sent to WhatsApp. Default: 'Me agradaría poder agendar una cita con ustedes' */
  message?: string;
  /** Direct link override if needed */
  customUrl?: string;
  /** Tooltip copy shown on hover. Default: 'Escríbenos por WhatsApp' */
  tooltipText?: string;
  /** Delay in seconds before button springs into view. Default: 2 */
  delay?: number;
  /** Extra CSS classes */
  className?: string;
}

/**
 * Authentic inline WhatsApp vector icon
 */
const WhatsAppIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16.02 2.5C8.57 2.5 2.5 8.57 2.5 16.02c0 2.5.68 4.93 1.98 7.07L2.5 30l7.15-1.92a13.48 13.48 0 006.37 1.6h.01c7.45 0 13.52-6.07 13.52-13.52 0-3.61-1.41-7.01-3.96-9.56A13.45 13.45 0 0016.02 2.5zm7.84 19.38c-.33.92-1.63 1.76-2.65 1.98-.7.15-1.61.27-4.69-.99-3.93-1.61-6.46-5.6-6.66-5.86-.19-.26-1.59-2.12-1.59-4.04s1-2.87 1.36-3.26c.36-.39.79-.49 1.05-.49.26 0 .53 0 .76.01.24.01.57-.09.89.68.33.79 1.12 2.73 1.22 2.93.1.2.16.43.03.69-.13.26-.2.43-.39.66-.2.23-.41.51-.59.69-.2.2-.41.42-.18.82.23.39 1.03 1.7 2.21 2.76 1.52 1.35 2.8 1.77 3.2 1.97.4.2.63.16.86-.1.23-.26.99-1.15 1.25-1.55.26-.39.53-.33.89-.2.36.13 2.31 1.09 2.71 1.29.4.2.66.3.76.46.1.16.1 1.09-.23 2.01z" />
  </svg>
);

/**
 * Floating WhatsApp contact button for Grupo Quadro.
 *
 * Features:
 * - Fixed floating position in the bottom-right corner (z-index: 50)
 * - Spring entrance animation triggered after 2 seconds via framer-motion
 * - Continuous ambient radar pulse ripple animation
 * - Interactive hover tooltip with smooth spring transitions
 * - Direct click opens chat with preconfigured message in WhatsApp
 */
export const WhatsAppButton: FC<WhatsAppButtonProps> = ({
  phoneNumber = '524497551585',
  message = 'Me agradaría poder agendar una cita con ustedes',
  customUrl,
  tooltipText = 'Escríbenos por WhatsApp',
  delay = 2,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const finalUrl =
    customUrl ||
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className={`${styles.wrapper} ${className}`.trim()}
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 260,
        damping: 20,
        mass: 0.75,
      }}
    >
      {/* Floating Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            id="whatsapp-tooltip"
            role="tooltip"
            className={styles.tooltip}
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.tooltipText}>{tooltipText}</span>
            <span className={styles.tooltipArrow} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.buttonWrapper}>
        {/* Pulsing Ripple Rings */}
        <span className={styles.pulseRing} aria-hidden="true" />
        <span className={styles.pulseRingSecondary} aria-hidden="true" />

        {/* Circular Action Button */}
        <motion.a
          href={finalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          aria-label="Escríbenos por WhatsApp - Abre chat de WhatsApp con Grupo Quadro"
          aria-describedby="whatsapp-tooltip"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <WhatsAppIcon className={styles.icon} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;
