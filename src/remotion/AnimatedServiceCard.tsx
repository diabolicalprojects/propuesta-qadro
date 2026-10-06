/**
 * AnimatedServiceCard — wraps a Remotion composition inside a <Player>
 * for inline playback in the Services section.
 */
import React from 'react'
import { Player } from '@remotion/player'
import {
  MarketingIcon,
  EcommerceIcon,
  WebIcon,
  BrandingIcon,
  SocialIcon,
  VideoIcon,
} from './ServiceIcons'

export interface ServiceCardDef {
  id: string
  label: string
  composition: React.FC<{ isDark?: boolean }>
}

export const SERVICE_CARDS: ServiceCardDef[] = [
  { id: 'marketing', label: 'Marketing',      composition: MarketingIcon },
  { id: 'ecommerce', label: 'E-commerce',     composition: EcommerceIcon },
  { id: 'web',       label: 'Páginas Web',    composition: WebIcon },
  { id: 'branding',  label: 'Branding',       composition: BrandingIcon },
  { id: 'social',    label: 'Redes Sociales', composition: SocialIcon },
  { id: 'video',     label: 'Foto & Video',   composition: VideoIcon },
]

interface Props {
  card: ServiceCardDef
  size?: number
  isDark?: boolean
}

const AnimatedServiceCard: React.FC<Props> = ({ card, size = 64, isDark = false }) => {
  return (
    <Player
      component={card.composition}
      compositionWidth={120}
      compositionHeight={120}
      durationInFrames={90}
      fps={30}
      loop
      autoPlay
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
