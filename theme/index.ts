import { createMuiTheme } from '@material-ui/core';
import { viVN } from './locale';
import palette from './palette';
import typography from './typography';

let theme = createMuiTheme(
  {
    typography: {
      fontFamily: ['"Helvetica Neue"', 'Roboto', 'Arial', 'sans-serif'].join(','),
    },
    palette,
    ...typography,
    shape: {
      borderRadius: 8,
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  },
  viVN,
);

theme = {
  ...theme,
  overrides: {
    MuiSnackbarContent: {
      root: {
        message: {
          width: '100%',
          justifyContent: 'center',
        },
      },
    },
    MuiSelect: {
      filled: {},
      select: {
        '&:focus': {
          backgroundColor: 'inherit',
        },
      },
    },

    MuiDrawer: {
      paper: {
        backgroundColor: '#243954',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '5px',
      },
      root: {
        border: '0.5px solid #C4CCDE',
      },
      elevation1: {
        boxShadow: '0px 4px 8px rgba(168, 168, 168, 0.25)',
      },
    },
    MuiTypography: {
      root: {
        lineHeight: '16px',
      },
      colorPrimary: {
        color: '#007BFF',
      },
      body2: {
        lineHeight: '24px',
        fontSize: '14px',
      },
    },
    MuiButton: {
      root: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        textAlign: 'center',
        color: '#212B35',
        '&:hover': {
          backgroundColor: '#0088FF',
        },
      },
      outlined: {
        border: '1px solid #C4CCDE',
        borderRadius: '3px',
        height: '36px',
        left: '0px',
        top: '0px',
        background: '#FFFFFF',
        boxSizing: 'border-box',
      },
      label: {
        textTransform: 'none',
      },
      contained: {
        height: '36px',
        borderRadius: '3px',
        left: '0px',
        top: '0px',
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        backgroundColor: '#0088FF',
      },
    },
    MuiInputBase: {
      root: {
        height: '40px',
        color: '#182537',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '21px',
        width: 'calc(100% + 4px)',
        [theme.breakpoints.up('sm')]: {
          width: '100%',
        },
        '&.Mui-disabled': {
          color: 'inherit',
          backgroundColor: '#E8EAEB',
        },
      },
      input: {
        fontWeight: 'inherit',
        fontFamily: '"Helvetica Neue","Roboto", "Arial", sans-serif',
        fontSize: 'inherit',
      },
      fullWidth: {
        width: 'calc(100% + 4px)',
        [theme.breakpoints.up('sm')]: {
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '3px',
      },
    },
    MuiTabs: {
      root: {},
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      },
    },
    MuiSvgIcon: {
      root: {
        '&.custom': {
          width: 'auto',
          height: 'auto',
        },
      },
      fontSizeSmall: {
        fontSize: '1rem',
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
        backgroundColor: '#212B35',
      },
      tooltipArrow: {
        borderRadius: 3,
        opacity: '100%',
        padding: '0.5em 1em',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
      },
      arrow: {
        color: '#212B35',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
      },
    },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: 'auto',
        },
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
    MuiTablePagination: {
      caption: {
        order: -2,
      },
      spacer: {
        order: -1,
      },
    },
    // @ts-ignore
    MuiPickersCalendarHeader: {
      switchHeader: {
        display: 'none',
      },
    },
    MuiGrid: {
      'spacing-xs-2': {
        width: 'calc(100% + 16px)',
      },
      [theme.breakpoints.up('sm')]: {
        'spacing-xs-2': {
          width: 'calc(100% + 12px)',
        },
        'spacing-xs-3': {
          width: 'calc(100% + 16px)',
        },
      },
    },
    MuiNativeSelect: {
      select: {
        backgroundColor: '#ffffff !important',
        '&:focus': {
          backgroundColor: '#ffffff !important',
        },
      },
    },
  },
};

export default theme;
