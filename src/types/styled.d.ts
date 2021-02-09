import 'styled-components';

// and extend them!
declare module 'styled-components' {
  interface Palette {
    primary: {
      light: string,
      main: string,
      dark: string,
      contrastText: string,
    },
    secondary: {
      light: string,
      main: string,
      dark: string,
      contrastText: string,
    },
    text: {
        primary: string,
        secondary: string,
        link: string,
    }
  }

  export interface DefaultTheme {
    palette: Palette,
  }
}