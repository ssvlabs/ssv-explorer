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
    palette: {
      divider: '#5B6C84',
      type: isDarkMode ? 'dark' : 'light',
    },
    typography: {
      color: '#2A323E',
      fontFamily: defaultFont,
      h1: {
        fontSize: 28,
        paddingTop: 24,
        fontWeight: 900,
        paddingBottom: 24,
        fontFamily: defaultFont,
        verticalAlign: 'middle',
        color: isDarkMode ? 'white' : '#2a323e',
      },
    },
  };
};
