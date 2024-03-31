import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: {
    light: '#63ccff',
    main: '#0088FF',
    dark: '#006db3',
  },
  secondary: {
    light: '#eca397',
    main: '#d2300f',
    dark: '#d2300f',
  },
};

const merchantPortalTheme = createMuiTheme({
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      color: '#0F1824',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '36px',
      letterSpacing: '-0.2px',
    },
    subtitle1: {
      color: '#0F1824',
      fontSize: '20px',
      fontWeight: 550,
      lineHeight: '28px',
      letterSpacing: '-0.2px',
    },
    subtitle2: {
      color: '#0F1824',
      fontSize: '16px',
      fontWeight: 550,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
    h6: {
      color: '#0F1824',
      fontWeight: 550,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
    body1: {
      color: '#0F1824',
      fontWeight: 450,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
    body2: {
      color: '#46515F',
      fontWeight: 450,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
    caption: {
      color: '#46515F',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-0.2px',
      fontStyle: 'italic',
    },
  },

  palette,
});

merchantPortalTheme.overrides = {
  MuiButton: {
    root: {
      padding: '8px 16px',
      textTransform: undefined,
      fontSize: '14px',
      fontWeight: 550,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      borderRadius: 6,
    },
    contained: {
      color: 'white',
      backgroundColor: merchantPortalTheme.palette.primary.main,
      boxShadow: undefined,
      '&:hover': {
        backgroundColor: merchantPortalTheme.palette.primary.main,
      },
    },
    containedSizeLarge: {
      fontSize: '16px',
      padding: '14px 22px',
    },

    text: {
      color: merchantPortalTheme.palette.primary.main,
    },
    textSizeLarge: {
      fontSize: '16px',
      padding: '14px 22px',
    },

    outlined: {
      padding: '7px 16px',
      border: `1px solid ${merchantPortalTheme.palette.primary.main}`,
      color: merchantPortalTheme.palette.primary.main,
      '&:hover': {
        backgroundColor: merchantPortalTheme.palette.primary.main,
        color: 'white',
      },
    },
    outlinedSizeLarge: {
      fontSize: '16px',
      padding: '13px 22px',
    },
  },

  MuiAccordion: {
    root: {
      boxShadow: 'none',
      border: `1px solid ${merchantPortalTheme.palette.grey[400]}`,
      overflow: 'hidden',
    },
    rounded: {
      borderRadius: 6,
      '&:first-child': {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      },
      '&.Mui-expanded:first-child': {
        borderRadius: 6,
      },
    },
  },

  MuiAccordionSummary: {
    root: {
      height: 44,
      minHeight: 44,
      '&.Mui-expanded': {
        minHeight: 44,
      },
      // borderBottom: `1px solid ${merchantPortalTheme.palette.grey[400]}`,
    },
    expanded: {
      // minHeight: 44,
    },
    content: {
      alignItems: 'center',
    },
  },

  MuiRadio: {
    colorSecondary: {
      color: `${merchantPortalTheme.palette.primary.main}`,
      '&.Mui-checked': {
        color: `${merchantPortalTheme.palette.primary.main}`,
      },
    },
  },

  MuiSkeleton: {
    root: {
      borderRadius: 6,
    },
  },

  MuiTooltip: {
    tooltip: {
      backgroundColor: '#243041',
    },
    arrow: {
      color: '#243041',
    },
  },
};

export default merchantPortalTheme;
