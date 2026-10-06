import type { FC, CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface FingerprintBgProps {
  color?: string
  opacity?: number
  size?: number
  animate?: boolean
  className?: string
  style?: CSSProperties
  variant?: 'full' | 'corner' | 'half'
}

/**
 * Reutilizable fingerprint background pattern — elemento característico de Qadro.
 * Se puede usar en cualquier sección con distintos colores y posiciones.
 */
const FingerprintBg: FC<FingerprintBgProps> = ({
  color = '#E63946',
  opacity = 0.12,
  size = 800,
  animate = true,
  className = '',
  style = {},
  variant = 'full',
}) => {
  const rings = [
    { rx: 40,  ry: 48,  sw: 1.6, op: 0.9, dash: undefined },
    { rx: 72,  ry: 85,  sw: 1.5, op: 0.82, dash: '160 24' },
    { rx: 108, ry: 126, sw: 1.4, op: 0.72, dash: undefined },
    { rx: 148, ry: 172, sw: 1.35,op: 0.63, dash: '220 38' },
    { rx: 192, ry: 222, sw: 1.3, op: 0.54, dash: undefined },
    { rx: 240, ry: 276, sw: 1.25,op: 0.46, dash: '290 46' },
    { rx: 292, ry: 334, sw: 1.2, op: 0.38, dash: undefined },
    { rx: 348, ry: 396, sw: 1.1, op: 0.30, dash: '380 56' },
    { rx: 408, ry: 462, sw: 1.0, op: 0.22, dash: undefined },
    { rx: 472, ry: 532, sw: 0.95,op: 0.16, dash: '480 64' },
    { rx: 540, ry: 608, sw: 0.85,op: 0.10, dash: undefined },
    { rx: 610, ry: 684, sw: 0.75,op: 0.06, dash: '580 70' },
  ]

  const svgStyle: CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    opacity,
    ...style,
  }

  const svgContent = (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={svgStyle}
      className={className}
    >
      <defs>
        <radialGradient id={`fpGrad-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={color} stopOpacity="1" />
          <stop offset="55%"  stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Centro — whorl biométrico */}
      <circle cx="500" cy="500" r="14" fill={color} opacity="0.6" />
      <path
        d="M500 486 C516 488 526 498 524 514 C522 530 506 538 492 532 C476 524 472 504 484 494"
        stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"
      />

      {/* Anillos concéntricos */}
      {rings.map((r, i) => (
        <ellipse
          key={i}
          cx="500" cy="500"
          rx={r.rx} ry={r.ry}
          stroke={`url(#fpGrad-${variant})`}
          strokeWidth={r.sw}
          strokeDasharray={r.dash}
          strokeLinecap="round"
          opacity={r.op}
        />
      ))}

      {/* Cortes orgánicos de cresta */}
      <path d="M430 548 C455 592 545 592 570 548" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.28" />
      <path d="M380 596 C418 648 582 648 620 596" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.18" />
      <path d="M330 640 C382 700 618 700 670 640" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.11" />
    </svg>
  )

  if (!animate) return svgContent

  return (
    <motion.div
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        style={{ opacity }}
      >
        <defs>
          <radialGradient id={`fpGrad-anim-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={color} stopOpacity="1" />
            <stop offset="55%"  stopColor={color} stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="500" cy="500" r="14" fill={color} opacity="0.6" />
        <path d="M500 486 C516 488 526 498 524 514 C522 530 506 538 492 532 C476 524 472 504 484 494"
          stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        {rings.map((r, i) => (
          <ellipse key={i} cx="500" cy="500"
            rx={r.rx} ry={r.ry}
            stroke={`url(#fpGrad-anim-${variant})`}
            strokeWidth={r.sw}
            strokeDasharray={r.dash}
            strokeLinecap="round"
            opacity={r.op}
          />
        ))}
        <path d="M430 548 C455 592 545 592 570 548" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.28" />
        <path d="M380 596 C418 648 582 648 620 596" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.18" />
      </svg>
    </motion.div>
  )
}

export default FingerprintBg
