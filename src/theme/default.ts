import { DefaultTheme } from 'styled-components'

const common = {
  white: '#FFFFFF',
  black: '#000000',
}

const palette = {
  primary: {
    light: '#F2C4BF',
    main: '#DF6C60',
    dark: '#D43B2B',
    contrastText: common.white,
  },
  secondary: {
    light: '#AAC9D4',
    main: '#3E6B7C',
    dark: '#2B4955',
    contrastText: common.white,
  },
  text: {
    primary: '#3E6B7C',
    secondary: '#DF6C60',
    link: '#EEF4F6i',
  },
}

const theme: DefaultTheme = {
  palette,
}

export default theme
