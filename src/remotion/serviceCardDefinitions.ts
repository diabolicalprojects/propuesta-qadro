import type React from 'react'
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
  { id: 'marketing', label: 'Marketing', composition: MarketingIcon },
  { id: 'ecommerce', label: 'E-commerce', composition: EcommerceIcon },
  { id: 'web', label: 'Páginas Web', composition: WebIcon },
  { id: 'branding', label: 'Branding', composition: BrandingIcon },
  { id: 'social', label: 'Redes Sociales', composition: SocialIcon },
  { id: 'video', label: 'Foto & Video', composition: VideoIcon },
]
