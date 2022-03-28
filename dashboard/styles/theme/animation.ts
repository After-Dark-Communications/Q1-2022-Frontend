import { keyframes } from '@stitches/react'

export type AnimationType = {
  (): string
  name: string
}

export const animation = {
  fadeIn: keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  }),
  fadeOut: keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  }),
  fadeInOut: keyframes({
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  }),
}
