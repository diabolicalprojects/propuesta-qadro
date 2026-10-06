import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { fingerprintRidges } from './fingerprintRidges'

export const SplashFingerprint: React.FC = () => {
  const frame = useCurrentFrame()
  const wordmarkOpacity = interpolate(frame, [32, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const wordmarkY = interpolate(frame, [32, 54], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scannerY = interpolate(frame, [8, 58], [-80, 355], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scannerOpacity = interpolate(frame, [4, 18, 48, 65], [0, 0.75, 0.75, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 500 }}>
        <svg viewBox="0 0 375 355" fill="none" aria-hidden="true" style={{ width: 420, height: 398 }}>
          <defs>
            <linearGradient id="splashFingerprintStroke" x1="0" y1="0" x2="375" y2="355" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F26469" />
              <stop offset="0.55" stopColor="#E63946" />
              <stop offset="1" stopColor="#A83044" />
            </linearGradient>
            <linearGradient
              id="splashFingerprintScan"
              x1="0"
              y1="0"
              x2="0"
              y2="75"
              gradientUnits="userSpaceOnUse"
              gradientTransform={`translate(0 ${scannerY})`}
            >
              <stop stopColor="#fff" stopOpacity="0" />
              <stop offset="0.65" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g stroke="url(#splashFingerprintStroke)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5" opacity="0.16">
            {fingerprintRidges.map(({ path }) => <path key={path} d={path} />)}
          </g>

          <g stroke="url(#splashFingerprintStroke)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5">
            {fingerprintRidges.map(({ path, length }, index) => {
              const progress = interpolate(frame, [index * 0.5, 42 + index * 0.5], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })

              return <path key={path} d={path} opacity={Math.min(1, progress * 16)} strokeDasharray={`${length} ${length}`} strokeDashoffset={length * (1 - progress)} />
            })}
          </g>

          <g stroke="url(#splashFingerprintScan)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5" opacity={scannerOpacity}>
            {fingerprintRidges.map(({ path, length }, index) => {
              const progress = interpolate(frame, [index * 0.5, 42 + index * 0.5], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })

              return <path key={path} d={path} opacity={Math.min(1, progress * 16)} strokeDasharray={`${length} ${length}`} strokeDashoffset={length * (1 - progress)} />
            })}
          </g>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: wordmarkOpacity, translate: `0 ${wordmarkY}px` }}>
          <span style={{ color: '#0D141A', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: '0.26em' }}>
            GRUPO
          </span>
          <strong style={{ color: '#E63946', fontFamily: 'Outfit, sans-serif', fontSize: 74, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1 }}>
            Qadro
          </strong>
        </div>
      </div>
    </AbsoluteFill>
  )
}
