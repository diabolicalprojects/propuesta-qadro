import React, { useEffect, useRef } from 'react'
import { Player } from '@remotion/player'
import type { PlayerRef } from '@remotion/player'
import { ArrowRight, ArrowUpRight, RotateCcw } from 'lucide-react'
import { HeroFingerprint } from '../remotion/HeroFingerprint'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import styles from './Hero.module.css'

const WA_URL =
  'https://api.whatsapp.com/send/?phone=4497551585&text=Quiero+agendar+una+cita&type=phone_number&app_absent=0'

const STATS = [
  { value: '250+', label: 'Clientes reales' },
  { value: '4.7 ★', label: 'Calificación' },
  { value: '+300%', label: 'ROI promedio' },
  { value: '16+', label: 'Años de trayectoria' },
]

export const Hero: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    if (reducedMotion) {
      player.pause()
      player.seekTo(120)
    } else {
      player.play()
    }
  }, [reducedMotion])

  const replayFingerprint = () => {
    const player = playerRef.current
    if (!player) return
    player.seekTo(0)
    player.play()
  }

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <h1 className={styles.h1}>
              Tu negocio necesita clientes, <span>no publicaciones bonitas.</span>
            </h1>

            <p className={styles.sub}>
              Convertimos estrategia, contenido y publicidad digital en citas agendadas y ventas reales para tu marca.
            </p>

            <div className={styles.ctaRow}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                Agendar cita de 15 minutos <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#servicios" className={styles.ctaSecondary}>
                Ver nuestros servicios <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className={styles.statsRow} aria-label="Grupo Qadro en cifras">
              {STATS.map(({ value, label }) => (
                <div key={label} className={styles.statItem}>
                  <strong className={styles.statValue}>{value}</strong>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visualCol}>
            <div className={styles.visualFrame}>
              <Player
                ref={playerRef}
                component={HeroFingerprint}
                compositionWidth={600}
                compositionHeight={600}
                durationInFrames={180}
                fps={30}
                loop
                autoPlay={!reducedMotion}
                initiallyMuted
                initialFrame={0}
                acknowledgeRemotionLicense
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <button type="button" className={styles.replayButton} onClick={replayFingerprint}>
              <RotateCcw size={14} aria-hidden="true" /> Repetir animación
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
