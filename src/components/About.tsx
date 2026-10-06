import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  Briefcase,
  Users,
  Smile,
  Calendar,
  Sparkles,
  TrendingUp,
  Award,
} from 'lucide-react';
import styles from './About.module.css';

interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  to,
  from = 0,
  duration = 2.2,
  suffix = '',
  prefix = '',
}) => {
  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCurrent(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
};

interface ExpertiseBarProps {
  label: string;
  percentage: number;
  delay?: number;
}

const ExpertiseBar: React.FC<ExpertiseBarProps> = ({
  label,
  percentage,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        const controls = animate(0, percentage, {
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        });
        return () => controls.stop();
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, percentage, delay]);

  return (
    <div className={styles.progressItem} ref={ref}>
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>{label}</span>
        <span className={styles.progressValue}>{displayValue}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percentage}%` } : { width: '0%' }}
          transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

const expertiseData = [
  { label: 'Marketing & Crecimiento', percentage: 95, delay: 0.1 },
  { label: 'Creatividad & Innovación', percentage: 86, delay: 0.25 },
  { label: 'Gestión & Resultados', percentage: 85, delay: 0.4 },
];

const statsData = [
  {
    target: 3,
    suffix: 'k+',
    label: 'Proyectos exitosos',
    icon: Briefcase,
  },
  {
    target: 200,
    suffix: '+',
    label: 'Equipo experto',
    icon: Users,
  },
  {
    target: 350,
    suffix: '+',
    label: 'Clientes felices',
    icon: Smile,
  },
  {
    target: 16,
    suffix: '+',
    label: 'Años de experiencia',
    icon: Calendar,
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Two-column layout */}
        <div className={styles.grid}>
          {/* Left Column: Descriptive text and progress bars */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.badgeWrapper}>
              <span className={styles.badge}>
                <span className={styles.badgeDot} />
                Sobre Nosotros
              </span>
            </div>

            <h2 className={styles.heading}>
              Tu aliado en transformación digital
            </h2>

            <p className={styles.description}>
              No somos solo diseñadores; somos creadores, solucionadores de problemas.
              En Qadro, vivimos y respiramos diseño. Creamos experiencias visuales
              cautivadoras que conectan con tu audiencia.
            </p>

            <div className={styles.progressList}>
              {expertiseData.map((item) => (
                <ExpertiseBar
                  key={item.label}
                  label={item.label}
                  percentage={item.percentage}
                  delay={item.delay}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Overlapping images/card placeholders */}
          <motion.div
            className={styles.visualWrapper}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Left Floating Badge */}
            <motion.div
              className={styles.badgeFloat}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className={styles.badgeFloatIcon}>
                <Award size={18} />
              </div>
              <span className={styles.badgeFloatText}>16+ Años de Experiencia</span>
            </motion.div>

            {/* Main Creative Card Placeholder */}
            <div className={styles.mainCard}>
              <div className={styles.ambientGlow} />
              <div className={styles.ambientGlowSecondary} />

              <div className={styles.cardHeader}>
                <div className={styles.cardBrandBadge}>
                  <span className={styles.cardDot} />
                  Qadro Studio
                </div>
                <span className={styles.cardStatus}>Estrategia 360°</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.graphicCanvas}>
                  <div className={styles.graphicRings}>
                    <div className={`${styles.ring} ${styles.ring1}`} />
                    <div className={`${styles.ring} ${styles.ring2}`} />
                    <div className={`${styles.ring} ${styles.ring3}`} />
                  </div>
                  <div className={styles.graphicIconCircle}>
                    <Sparkles size={22} />
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>Diseño & Transformación</h3>
                <p className={styles.cardTagline}>
                  Elevando marcas a través de experiencias digitales con impacto real.
                </p>
              </div>
            </div>

            {/* Bottom Right Overlapping Card */}
            <motion.div
              className={styles.secondaryCard}
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <div className={styles.secondaryCardIcon}>
                <TrendingUp size={22} />
              </div>
              <div className={styles.secondaryCardContent}>
                <span className={styles.secondaryCardValue}>+150%</span>
                <span className={styles.secondaryCardLabel}>Crecimiento de Marca</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row at Bottom */}
        <motion.div
          className={styles.statsContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.statsGrid}>
            {statsData.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={styles.statItem}>
                  <div className={styles.statItemTop}>
                    <div className={styles.statIconWrapper}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className={styles.statValue}>
                    <AnimatedCounter
                      to={stat.target}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
