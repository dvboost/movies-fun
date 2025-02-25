import { StyleFunctionProps, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const themeConfig = {
  components: {
    Tag: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'full',
        border: '2px solid orange',
          color: 'orange.500',
          bg: 'transparent',
          _hover: {
            bg: 'orange.100',
          },
      },
      variants: {
        outline: {
          border: '2px solid orange',
          color: 'orange.500',
          bg: 'transparent',
          _hover: {
            bg: 'orange.100',
          },
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {},
  fonts: {
    heading: 'var(--font-teko)',
    body: 'var(--font-teko)',
  },
  fontSizes: {
    md: '1.25rem',
    lg: '1.5rem',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: 'black',
        bg: '#EEEADF',
      },
    }),
  },
}

type ThemeType = typeof themeConfig

export const theme = extendTheme(themeConfig) as ThemeType
