/**
 * Professional Remotion animated icon compositions for Grupo Quadro services.
 * Accepts `isDark` prop to adapt vector colors dynamically for light/dark cards.
 */
import React from 'react'
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion'

const RED = '#E63946'
const BLUE = '#3B82F6'
const GREEN = '#10B981'

interface IconProps {
  isDark?: boolean
}

/* ────────────────────────────────────────────────────────────────────── */
/*  1. MARKETING & ADS (Publicidad Digital)                             */
/* ────────────────────────────────────────────────────────────────────── */
export const MarketingIcon: React.FC<IconProps> = ({ isDark = false }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mainColor = isDark ? '#FFFFFF' : '#0D141A'
  const cardBg = isDark ? '#1E293B' : '#FFFFFF'
  const strokeColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(13,20,26,0.12)'

  const cardSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 } })
  const lineDraw = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 18, stiffness: 90 } })
  
  const roiValue = Math.round(interpolate(lineDraw, [0, 1], [100, 340]))

  const cursorProgress = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 12, stiffness: 150 } })
  const cursorX = interpolate(cursorProgress, [0, 1], [105, 72])
  const cursorY = interpolate(cursorProgress, [0, 1], [105, 80])
  const clickScale = interpolate(cursorProgress, [0, 0.8, 1], [1, 0.8, 1])

  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Background card */}
      <rect
        x="10" y="15" width="100" height="90" rx="14"
        fill={cardBg} stroke={strokeColor} strokeWidth="2"
        transform={`scale(${cardSpring})`}
        style={{ transformOrigin: '60px 60px' }}
      />

      {/* Header bar */}
      <rect x="20" y="27" width="40" height="8" rx="4" fill={mainColor} opacity="0.8" />
      <rect x="76" y="25" width="26" height="12" rx="6" fill={GREEN} opacity="0.2" />
      <text x="89" y="33.5" textAnchor="middle" fill={GREEN} fontSize="7.5" fontWeight="800">+{roiValue}%</text>

      {/* Chart Line */}
      <path
        d="M22 80 Q 40 75, 55 60 T 98 38"
        fill="none"
        stroke={RED}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={interpolate(lineDraw, [0, 1], [120, 0])}
      />

      {/* Area under curve */}
      <path
        d="M22 80 Q 40 75, 55 60 T 98 38 L 98 85 L 22 85 Z"
        fill="url(#markGrad)"
        opacity={interpolate(lineDraw, [0, 1], [0, 0.3])}
      />
      <defs>
        <linearGradient id="markGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={RED} />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Button launch */}
      <rect x="48" y="73" width="50" height="20" rx="6" fill={RED} />
      <text x="73" y="85.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800">ADS LIVE</text>

      {/* Click cursor */}
      <g transform={`translate(${cursorX}, ${cursorY}) scale(${clickScale})`}>
        <polygon points="0,0 4,14 8,9 14,14 16,12 11,7 16,5" fill={mainColor} stroke={isDark ? '#000000' : '#FFFFFF'} strokeWidth="1" />
      </g>
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  2. E-COMMERCE & VENTAS EN LÍNEA                                     */
/* ────────────────────────────────────────────────────────────────────── */
export const EcommerceIcon: React.FC<IconProps> = ({ isDark = false }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mainColor = isDark ? '#FFFFFF' : '#0D141A'
  const wheelCenter = isDark ? '#141C24' : '#FFFFFF'

  const cartEntrance = spring({ frame, fps, config: { damping: 14, stiffness: 90 } })
  const cartX = interpolate(cartEntrance, [0, 1], [-30, 0])

  const itemDrop = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 10, stiffness: 180 } })
  const itemY = interpolate(itemDrop, [0, 1], [-28, 0])

  const checkPop = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 220 } })
  const checkScale = interpolate(checkPop, [0, 1], [0, 1])

  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width: '100%', height: '100%' }}>
      <g transform={`translate(${cartX}, 0)`}>
        {/* Cart chassis */}
        <path
          d="M18 35 L28 35 L43 70 L88 70 L98 45 L33 45"
          fill="none"
          stroke={mainColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wheels */}
        <circle cx="48" cy="84" r="7" fill={mainColor} />
        <circle cx="48" cy="84" r="3" fill={wheelCenter} />
        <circle cx="80" cy="84" r="7" fill={mainColor} />
        <circle cx="80" cy="84" r="3" fill={wheelCenter} />

        {/* Item inside cart */}
        <g transform={`translate(54, ${45 + itemY})`}>
          <rect x="-14" y="-14" width="28" height="24" rx="6" fill={RED} />
          <path d="M-6 -4 L0 -10 L6 -4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* Success checkmark badge */}
      <g transform={`translate(92, 28) scale(${checkScale})`} style={{ transformOrigin: '92px 28px' }}>
        <circle cx="0" cy="0" r="16" fill={GREEN} />
        <path d="M-6 0 L-2 4 L6 -4" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  3. PÁGINAS WEB & DESARROLLO WEB                                      */
/* ────────────────────────────────────────────────────────────────────── */
export const WebIcon: React.FC<IconProps> = ({ isDark = false }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mainColor = isDark ? '#FFFFFF' : '#0D141A'
  const cardBg = isDark ? '#1E293B' : '#FFFFFF'
  const strokeColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(13,20,26,0.15)'

  const browserSpring = spring({ frame, fps, config: { damping: 16, stiffness: 90 } })

  const b1 = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 120 } })
  const b2 = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 14, stiffness: 120 } })
  const b3 = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 14, stiffness: 120 } })

  const pulseScale = interpolate((frame * 2) % 40, [0, 40], [1, 1.4])
  const pulseOpacity = interpolate((frame * 2) % 40, [0, 40], [0.6, 0])

  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Browser window */}
      <g transform={`scale(${browserSpring})`} style={{ transformOrigin: '60px 60px' }}>
        <rect x="12" y="18" width="96" height="84" rx="10" fill={cardBg} stroke={strokeColor} strokeWidth="2.5" />
        <path d="M12 36 L108 36" stroke={strokeColor} strokeWidth="1.5" />

        {/* Browser control dots */}
        <circle cx="22" cy="27" r="3" fill="#FF5F56" />
        <circle cx="30" cy="27" r="3" fill="#FFBD2E" />
        <circle cx="38" cy="27" r="3" fill="#27C93F" />

        {/* Hero layout block inside window */}
        <rect
          x="20" y="44" width="50" height="10" rx="3"
          fill={mainColor}
          opacity={interpolate(b1, [0, 1], [0, 0.9])}
        />
        <rect
          x="20" y="58" width="76" height="6" rx="2"
          fill={mainColor}
          opacity={interpolate(b2, [0, 1], [0, 0.35])}
        />

        {/* Call to action button */}
        <g transform="translate(20, 72)" opacity={interpolate(b3, [0, 1], [0, 1])}>
          <rect x="0" y="0" width="38" height="15" rx="4" fill={RED} />
          <rect x="0" y="0" width="38" height="15" rx="4" fill="none" stroke={RED} strokeWidth="2" transform={`scale(${pulseScale})`} opacity={pulseOpacity} style={{ transformOrigin: '19px 7.5px' }} />
        </g>
      </g>
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  4. BRANDING & IDENTIDAD VISUAL                                      */
/* ────────────────────────────────────────────────────────────────────── */
export const BrandingIcon: React.FC<IconProps> = ({ isDark = false }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mainColor = isDark ? '#FFFFFF' : '#0D141A'

  const strokeSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } })

  const swatch1 = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 100 } })
  const swatch2 = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 100 } })
  const swatch3 = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 14, stiffness: 100 } })

  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Brand emblem vector drafting */}
      <path
        d="M30 70 C 30 30, 90 30, 90 70 Z"
        fill="none"
        stroke={mainColor}
        strokeWidth="3.5"
        strokeDasharray="200"
        strokeDashoffset={interpolate(strokeSpring, [0, 1], [200, 0])}
        strokeLinecap="round"
      />

      {/* Vector anchor handles */}
      <rect x="27" y="67" width="6" height="6" fill={BLUE} />
      <rect x="87" y="67" width="6" height="6" fill={BLUE} />
      <circle cx="60" cy="35" r="4" fill={RED} />

      {/* Color swatches */}
      <g transform="translate(60, 85)">
        <circle cx="-28" cy="0" r="10" fill={RED} transform={`scale(${swatch1})`} />
        <circle cx="0" cy="0" r="10" fill={BLUE} transform={`scale(${swatch2})`} />
        <circle cx="28" cy="0" r="10" fill={GREEN} transform={`scale(${swatch3})`} />
      </g>
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  5. REDES SOCIALES & CONTENIDO                                       */
/* ────────────────────────────────────────────────────────────────────── */
export const SocialIcon: React.FC<IconProps> = ({ isDark = false }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mainColor = isDark ? '#FFFFFF' : '#0D141A'
  const cardBg = isDark ? '#1E293B' : '#FFFFFF'
  const strokeColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(13,20,26,0.15)'

  const cardEntrance = spring({ frame, fps, config: { damping: 16, stiffness: 90 } })

  const heartSpring = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 10, stiffness: 200 } })
  const heartScale = interpolate(heartSpring, [0, 1], [0.3, 1])

  const count = Math.round(interpolate(heartSpring, [0, 1], [1200, 15800]))
  const formattedCount = (count / 1000).toFixed(1) + 'k'

  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Phone/Reel container */}
      <rect
        x="24" y="12" width="72" height="96" rx="14"
        fill={cardBg} stroke={strokeColor} strokeWidth="2.5"
        transform={`scale(${cardEntrance})`}
        style={{ transformOrigin: '60px 60px' }}
      />

      {/* Reel avatar */}
      <circle cx="40" cy="30" r="7" fill={RED} opacity="0.9" />
      <rect x="52" y="27" width="30" height="6" rx="3" fill={mainColor} opacity="0.7" />

      {/* Central heart icon */}
      <g transform={`translate(60, 60) scale(${heartScale})`}>
        <path
          d="M0 -6 C -6 -16, -20 -8, -20 4 C -20 16, 0 26, 0 26 C 0 26, 20 16, 20 4 C 20 -8, 6 -16, 0 -6 Z"
          fill={RED}
        />
      </g>

      {/* Engagement badge */}
      <rect x="36" y="86" width="48" height="14" rx="7" fill={RED} />
      <text x="60" y="95.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800">♥ {formattedCount}</text>
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  6. FOTO & VIDEO (Producción Audiovisual)                           */
/* ────────────────────────────────────────────────────────────────────── */
export const VideoIcon: React.FC<IconProps> = ({ isDark = false }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const clapperBg = isDark ? '#1E293B' : '#0D141A'

  const slamSpring = spring({ frame, fps, config: { damping: 9, stiffness: 180 } })
  const clapperAngle = interpolate(slamSpring, [0, 1], [-30, 0])

  const recOpacity = Math.sin(frame * 0.2) > 0 ? 1 : 0.2

  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Clapper body */}
      <rect x="20" y="45" width="80" height="55" rx="8" fill={clapperBg} stroke={isDark ? 'rgba(255,255,255,0.2)' : 'none'} strokeWidth="1.5" />
      <circle cx="60" cy="72" r="14" fill={RED} />
      <polygon points="56,66 56,78 68,72" fill="#FFFFFF" />

      {/* Clapper arm bottom */}
      <rect x="20" y="34" width="80" height="10" rx="2" fill={clapperBg} />

      {/* Clapper arm top (hinged) */}
      <g transform={`rotate(${clapperAngle}, 20, 34)`}>
        <rect x="20" y="22" width="80" height="10" rx="2" fill={clapperBg} />
        <path d="M30 22 L38 32 M50 22 L58 32 M70 22 L78 32" stroke="#FFFFFF" strokeWidth="3" />
      </g>

      {/* REC badge */}
      <circle cx="92" cy="18" r="4.5" fill={RED} opacity={recOpacity} />
      <text x="80" y="21" fill={RED} fontSize="8" fontWeight="800">REC</text>
    </svg>
  )
}
