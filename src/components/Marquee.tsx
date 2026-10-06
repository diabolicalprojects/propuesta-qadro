import type { FC, CSSProperties } from 'react';
import styles from './Marquee.module.css';

export interface MarqueeProps {
  /** Array of strings to display in the ticker */
  items?: string[];
  /** Animation duration in seconds (lower is faster). Default: 32 */
  speed?: number;
  /** Pause the scroll animation on hover. Default: true */
  pauseOnHover?: boolean;
  /** Scroll direction: 'left' or 'right'. Default: 'left' */
  direction?: 'left' | 'right';
  /** Visual variant: 'dark' (#0D141A background) or 'outline' (transparent with stroked text). Default: 'dark' */
  variant?: 'dark' | 'outline';
  /** Number of times items are duplicated inside each track block to guarantee seamless filling on ultra-wide screens. Default: 2 */
  repeatCount?: number;
  /** Custom extra CSS classes */
  className?: string;
}

const DEFAULT_ITEMS: string[] = [
  'Marketing Digital',
  'Diseño Web',
  'E-Commerce',
  'Branding',
  'Social Media',
  'Producción de Video',
  'SEO',
  'Contenido Digital',
];

/**
 * 4-point star / diamond decorator in Grupo Quadro brand red (#E63946)
 */
const DiamondStar: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

/**
 * Infinite horizontal scrolling text banner (ticker/marquee) for Grupo Quadro.
 *
 * Uses hardware-accelerated CSS keyframes for 60fps smooth loop without JavaScript animation.
 * Typically positioned between the Hero and Services sections.
 */
export const Marquee: FC<MarqueeProps> = ({
  items = DEFAULT_ITEMS,
  speed = 32,
  pauseOnHover = true,
  direction = 'left',
  variant = 'dark',
  repeatCount = 2,
  className = '',
}) => {
  // Multiply items within each track to ensure wide screens are fully populated
  const displayItems = Array.from({ length: repeatCount }, () => items).flat();

  const containerClasses = [
    styles.marqueeWrapper,
    variant === 'outline' ? styles.variantOutline : '',
    direction === 'right' ? styles.reverse : '',
    pauseOnHover ? styles.pauseOnHover : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVariables: CSSProperties = {
    ['--speed' as string]: `${speed}s`,
  };

  const renderTrackItems = (keyPrefix: string) =>
    displayItems.map((item, index) => (
      <div key={`${keyPrefix}-${item}-${index}`} className={styles.itemGroup}>
        <span className={styles.itemText}>{item}</span>
        <DiamondStar className={styles.decorator} />
      </div>
    ));

  return (
    <section
      className={containerClasses}
      style={cssVariables}
      role="region"
      aria-label="Servicios y especialidades destacadas"
    >
      <div className={styles.inner}>
        {/* Primary track */}
        <div className={styles.track}>
          {renderTrackItems('primary')}
        </div>

        {/* Cloned secondary track for seamless, gapless infinite loop */}
        <div className={styles.track} aria-hidden="true">
          {renderTrackItems('clone')}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
