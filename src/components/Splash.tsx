import { useEffect, useRef, useState } from 'react'
import { Player } from '@remotion/player'
import type { PlayerRef } from '@remotion/player'
import { SplashFingerprint } from '../remotion/SplashFingerprint'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import styles from './Splash.module.css'

const SPLASH_FRAMES = 78
const SPLASH_FPS = 30

const Splash = () => {
  const playerRef = useRef<PlayerRef>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [leaving, setLeaving] = useState(false)
  const shouldShow = visible && !reducedMotion

  useEffect(() => {
    if (reducedMotion) return

    const player = playerRef.current
    const finish = () => setLeaving(true)
    player?.addEventListener('ended', finish)
    const fallback = window.setTimeout(finish, 3200)

    return () => {
      player?.removeEventListener('ended', finish)
      window.clearTimeout(fallback)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!shouldShow) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [shouldShow])

  useEffect(() => {
    if (!leaving) return
    const timeout = window.setTimeout(() => setVisible(false), 380)
    return () => window.clearTimeout(timeout)
  }, [leaving])

  if (!shouldShow) return null

  return (
    <div className={`${styles.splash} ${leaving ? styles.leaving : ''}`} role="status" aria-label="Iniciando Grupo Qadro">
      <div className={styles.playerFrame}>
        <Player
          ref={playerRef}
          component={SplashFingerprint}
          compositionWidth={600}
          compositionHeight={600}
          durationInFrames={SPLASH_FRAMES}
          fps={SPLASH_FPS}
          autoPlay
          initiallyMuted
          acknowledgeRemotionLicense
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

export default Splash
