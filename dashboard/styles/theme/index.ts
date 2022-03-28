import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

// Default NSFW Theme is a DARK theme.
export const {
  styled,
  css,
  keyframes,
  theme,
  createTheme,
  config,
  globalCss,
  getCssText,
} = createStitches({
  // 900 is the lightest color on a dark theme, and the darkest color on a light theme.
  // https://www.radix-ui.com/colors
  theme: {
    colors: {
      voilet200: '#793AFF', // this shade is slightly lighter
      voilet100: '#7230FF', // This shade is slightly darker
      red100: '#E94B4B',
      gold100: '#FBC22F',
      // Reverse naming to support dark/light theme mode color scale concept
      // TODO: review this with @maine
      //                  /| Figma value |
      gray900: '#FFFFFF', // white
      gray800: '#898EA2', // gray 400
      gray700: '#5B5E6C', // gray 500
      gray600: '#3D3F48', // gray 600
      gray500: '#2C2E35', // gray 700
      gray400: '#282A30', // gray 800
      gray300: '#202126', // gray300
      gray100: '#1B1C20', // gray 900
    },
    fonts: {
      primary: '"Inter", sans-serif',
      secondary: '"Roboto", Arial, Helvetica, sans-serif;',
    },
    radii: {},
    shadows: {
      lg: '6px 3px 16px #121217',
      sm: '6px -7px 16px #121217',
    },
    zIndices: {
      modal: 6000,
      overlay: 4000,
      dropdown: 3000,
      layerThree: 2500,
      layerTwo: 2000,
      layerOne: 1500,
      foreground: 1000,
      background: -1000,
    },
    transitions: {
      easeOutExpo: `cubic-bezier(0.16, 1, 0.3, 1)`,
      iconColor: `fill 200ms ease, stroke 200ms ease`,
    },
    gradients: {
      blue: `linear-gradient(275deg, #7863FE 0%, #13C1EB 120%)`,
    },
    maxWidths: {
      xsmall: 544,
      small: 768,
      medium: 1012,
      large: 1280,
      xlarge: 1440,
      xxlarge: 1920,
    },
    container: {
      maxWidth: '1136px',
    },
  },
  media: {
    xs: '(min-width: 375px)',
    sm: '(min-width: 480px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1200px)',
  },
})

export type CSS = Stitches.CSS<typeof config>
export type CSSProp = { css?: CSS }
export * from './animation'
