/**
 * AnimatedServiceCard — wraps a Remotion composition inside a <Player>
 * for inline playback in the Services section.
 */
import React, { useEffect, useRef } from 'react'
import { Player } from '@remotion/player'
import type { PlayerRef } from '@remotion/player'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { ServiceCardDef } from './serviceCardDefinitions'

interface Props {
  card: ServiceCardDef
  size?: number
  isDark?: boolean
}

const AnimatedServiceCard: React.FC<Props> = ({ card, size = 64, isDark = false }) => {
  const playerRef = useRef<PlayerRef>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    if (reducedMotion) {
      player.pause()
      player.seekTo(60)
    } else {
      player.play()
    }
  }, [reducedMotion])

  return (
    <Player
      ref={playerRef}
      component={card.composition}
      compositionWidth={120}
      compositionHeight={120}
      durationInFrames={90}
      fps={30}
      loop
      autoPlay={!reducedMotion}
      initiallyMuted
      initialFrame={60}
      acknowledgeRemotionLicense
      style={{
        width: size,
        height: size,
      }}
      inputProps={{ isDark }}
    />
  )
}

export default AnimatedServiceCard
