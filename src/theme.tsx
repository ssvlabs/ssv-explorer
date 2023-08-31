declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors?: any
  }

  interface ThemeOptions {
    colors?: any
  }
}

type ThemeParams = {
  isDarkMode?: boolean,
};

export const grayBackgroundColor = '#A1ACBE';

export const infoIconStyle = {
  fontSize: 13,
  color: grayBackgroundColor,
};

export const defaultFont = '"Encode Sans", "Roboto", "Helvetica", "Arial", sans-serif';

export const AppTheme = ({ isDarkMode }: ThemeParams): any => {
  return {
    colors: {
      gray0: isDarkMode ? '#062031' : '#f9fbfc',
      gray10: isDarkMode ? '#011627' : '#f4f7fa',
      gray20: isDarkMode ? '#34455a' : '#e6eaf7',
      gray30: isDarkMode ? '#63768b' : '#cbd3e5',
      gray40: '#97a5ba',
      gray60: isDarkMode ? '#cbd3e5' : '#63768b',
      gray80: isDarkMode ? '#e6eaf7' : '#34455a',
      gray90: isDarkMode ? '#fdfefe' : '#0b2a3c',
      gray100: isDarkMode ? '#f9fbfc' : '#062031',
      black: isDarkMode ? '#f4f7fa' : '#011627',
      white: isDarkMode ? '#0b2a3c' : '#fdfefe',
      primaryBlue: '#1ba5f8',
      shade20: isDarkMode ? '#49b6f9' : '#0792e8',
      shade40: isDarkMode ? '#76c8fb' : '#067bc4',
      shade70: isDarkMode ? '#bbe4fd' : '#045588',
      shade80: isDarkMode ? '#d1edfe' : '#034872',
      shade90: isDarkMode ? '#e8f6fe' : '#033a5d',
      tint20: isDarkMode ? '#0792e8' : '#49b6f9',
      tint40: isDarkMode ? '#067bc4' : '#76c8fb',
      tint70: isDarkMode ? '#045588' : '#bbe4fd',
      tint80: isDarkMode ? '#034872' : '#d1edfe',
      tint90: isDarkMode ? '#033a5d' : '#e8f6fe',
      primarySuccessDark: isDarkMode ? '#08c858' : '#06b64f',
      primaryWarningRegular: isDarkMode ? '#ffd20a' : '#ffd20a',
      squareScreenBackground: isDarkMode ? '#0b2a3c' : '#fdfefe',
      primaryError: '#ec1c26',
      primarySuccess: '#ec1c26',
      applicationBackground: isDarkMode ? '#f4f7fa' : '#f4f7fa',
      primaryErrorRegular: isDarkMode ? 'rgba(236, 28, 38, 0.32)' : 'rgba(236, 28, 38, 0.12)',
      primarySuccessRegularOpacity: isDarkMode ? 'rgba(8, 200, 88, 0.32)' : 'rgba(8, 200, 88, 0.16)',
    },
    palette: {
      divider: '#5B6C84',
      type: isDarkMode ? 'dark' : 'light',
    },
    typography: {
      color: '#2A323E',
      h1: {
        fontSize: 28,
        paddingTop: 24,
        fontWeight: 900,
        paddingBottom: 24,
        verticalAlign: 'middle',
        color: isDarkMode ? 'white' : '#2a323e',
      },
    },
  };
};
