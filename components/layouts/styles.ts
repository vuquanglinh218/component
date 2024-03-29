import { createStyles } from '@material-ui/core';
const drawerWidth = 200;
const styles = (theme) => {
  return createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      width: 0,
      backgroundColor: '#243954',
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: 'white',
      height: 52,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#243954',
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    notSelectedButton: {
      '& p': {
        color: '#FFFFFF',
      },
      '& svg': {
        fill: '#FFFFFF',
      },
    },
    logoutButton: {
      '& p': {
        color: '#FFFFFF',
      },
      '& svg': {
        fill: '#FFFFFF',
      },
      marginTop: 'auto',
    },
    selectedButton: {
      '& p': {
        color: '#0088FF',
      },
      '& svg': {
        fill: '#0088FF',
      },
    },
    childContainer: {
      marginLeft: '19.75rem',
      marginRight: '3.75rem',
      display: 'flex',
      flexGrow: 1,
      height: '99%',
    },
    backgroundDiv: {
      backgroundColor: '#f4f6f8',
      flex: 1,
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'lime',
      overflowY: 'scroll',
    },
    drawerlist: {
      display: 'contents',
      width: drawerWidth,
    },
    typo: {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '24px',
      fontStyle: 'normal',
      color: '#FFFFFF',
    },
    iconGrid: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItemTypo: {
      fontWeight: 400,
      fontSize: 14,
      marginRight: '4rem',
      width: 'max-content',
    },
    grid: {
      padding: 'unset',
    },
    listPadding: {
      paddingRight: '4rem',
    },
    headerItem: {
      border: '1px solid #32313A',
      height: '52px',
    },
    navContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth,
      backgroundColor: '#243954',
    },
    mainContainer: {
      margin: '75px 25px 21px 25px',
      [theme.breakpoints.up('sm')]: {
        margin: '75px 32px 21px 32px',
        display: 'inline-table',
      },
      borderRadius: '3px',
      display: 'block',
    },
    mainContainerMarginTopOnly: {
      margin: '75px 0 21px 0',
      [theme.breakpoints.up('sm')]: {
        margin: '75px 0 32px 0',
        paddingLeft: '32px',
        paddingRight: '32px',
        display: 'inline-table',
      },
      borderRadius: '3px',
      display: 'block',
    },
    routerMenu: {
      marginLeft: '8px',
      marginRight: '8px',
      width: 'calc(100% - 16px)',
      color: '#FFFFFF',
    },
    activeMenu: {
      color: '#FFFFFF',
      marginLeft: '8px',
      marginRight: '8px',
      width: 'calc(100% - 16px)',
      backgroundColor: '#0088FF',
      borderRadius: '3px',
    },
    titleInput: {
      color: '#747C87',
    },
    titleLabel: {
      color: '#182537',
      fontWeight: 600,
      fontSize: 16,
      display: 'none',
      lineHeight: '20px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    userNameLabel: {
      display: 'none',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    nameLabel: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 500,
      color: '#182537',
      paddingLeft: '5px',
    },
    titleAccountDetail: {
      height: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: 8,
      },
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 48,
      '& .sb-avatar span span': {
        fontSize: 18,
      },
    },
  });
};
export default styles;
