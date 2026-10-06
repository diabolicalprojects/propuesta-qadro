import { brandFingerprintPaths } from './brandFingerprintPaths'

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

export const fingerprintRidges = brandFingerprintPaths.map((path) => ({ path, length: measureRidge(path) }))
