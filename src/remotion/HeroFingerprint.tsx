import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { brandFingerprintPaths } from './brandFingerprintPaths'

// Measure the quadratic curves once so each SVG stroke reveals at its actual length.
const measureRidge = (path: string) => {
  const tokens = path.match(/[MQ]|-?\d+(?:\.\d+)?/g) ?? []
  let cursor = 0
  let x = 0
  let y = 0
  let length = 0

  while (cursor < tokens.length) {
    const command = tokens[cursor++]
    if (command === 'M') {
      x = Number(tokens[cursor++])
      y = Number(tokens[cursor++])
      continue
    }
    if (command !== 'Q') continue

    const controlX = Number(tokens[cursor++])
    const controlY = Number(tokens[cursor++])
    const endX = Number(tokens[cursor++])
    const endY = Number(tokens[cursor++])
    let previousX = x
    let previousY = y

    for (let sample = 1; sample <= 16; sample++) {
      const t = sample / 16
      const inverse = 1 - t
      const sampleX = inverse * inverse * x + 2 * inverse * t * controlX + t * t * endX
      const sampleY = inverse * inverse * y + 2 * inverse * t * controlY + t * t * endY
      length += Math.hypot(sampleX - previousX, sampleY - previousY)
      previousX = sampleX
      previousY = sampleY
    }

    x = endX
    y = endY
  }

  return length
}

const ridges = brandFingerprintPaths.map((path) => ({ path, length: measureRidge(path) }))

const ridgeProgress = (frame: number, index: number) => {
  const drawDelay = index * 0.4
  const eraseDelay = (ridges.length - index - 1) * 0.35

  return interpolate(
    frame,
    [0, 12 + drawDelay, 76 + drawDelay, 128 + eraseDelay, 165 + eraseDelay, 179],
    [0.45, 0.45, 1, 1, 0.45, 0.45],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )
}

export const HeroFingerprint: React.FC = () => {
  const frame = useCurrentFrame()
  const scannerY = interpolate(frame, [0, 12, 96, 179], [-80, -80, 370, 370], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scannerOpacity = interpolate(frame, [0, 10, 22, 84, 102, 179], [0, 0, 0.8, 0.8, 0, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const glowOpacity = interpolate(frame, [0, 52, 110, 150, 179], [0.55, 1, 0.7, 1, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <svg viewBox="0 0 375 355" fill="none" role="img" aria-label="Huella dactilar de Grupo Qadro dibujándose">
      <defs>
        <linearGradient id="qadroFingerprintStroke" x1="0" y1="0" x2="375" y2="355" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F26469" />
          <stop offset="0.58" stopColor="#E23D4C" />
          <stop offset="1" stopColor="#9A3042" />
        </linearGradient>
        <radialGradient id="qadroFingerprintGlow" cx="0" cy="0" r="1" gradientTransform="translate(184 180) rotate(90) scale(180 190)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E63946" stopOpacity={0.085 * glowOpacity} />
          <stop offset="1" stopColor="#E63946" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="qadroFingerprintScan"
          x1="0"
          y1="0"
          x2="0"
          y2="72"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${scannerY})`}
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="0.38" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.67" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d="M0 0H375V355H0z" fill="url(#qadroFingerprintGlow)" />

      <g stroke="url(#qadroFingerprintStroke)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.2" opacity="0.23">
        {ridges.map(({ path }) => <path key={path} d={path} />)}
      </g>

      <g stroke="url(#qadroFingerprintStroke)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.2" opacity="0.93">
        {ridges.map(({ path, length }, index) => (
          <path
            key={path}
            d={path}
            strokeDasharray={`${length} ${length}`}
            strokeDashoffset={length * (1 - ridgeProgress(frame, index))}
          />
        ))}
      </g>

      <g
        stroke="url(#qadroFingerprintScan)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8.2"
        opacity={scannerOpacity}
        aria-hidden="true"
      >
        {ridges.map(({ path, length }, index) => (
          <path
            key={path}
            d={path}
            strokeDasharray={`${length} ${length}`}
            strokeDashoffset={length * (1 - ridgeProgress(frame, index))}
          />
        ))}
      </g>
    </svg>
  )
}
