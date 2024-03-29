import { createStyles } from '@material-ui/core';

let commonStyles = (theme) => {
  return createStyles({
    outermostGridDisplayBlock: {
      display: 'block',
      backgroundColor: '#ffffff',
      borderRadius: '3px',
    },
    gridCenterAlign: {
      alignItems: 'center',
    },
    fatherGridWithPadding: {
      padding: '1.5rem 1rem',
    },
    grandFatherGridPaddingTopBot: {
      margin: '1rem 0rem',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    grandFatherGridPaddingConnectSocial: {
      margin: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        margin: '1rem 0rem',
      },
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    grandFatherGridPaddingTopBotTenant: {
      margin: 'unset',
      [theme.breakpoints.up('sm')]: {
        margin: '1rem 0rem',
      },
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      background: '#ffffff',
    },
    detailPaper: {
      border: 'unset',
      [theme.breakpoints.up('sm')]: {
        border: '1px solid #C4CCDE',
      },
    },
    detailPaperWithBorder: {
      border: '1px solid #C4CCDE',
    },
    detailPaperSocial: {
      border: '1px solid #C4CCDE',
      marginRight: '4px',
      [theme.breakpoints.up('sm')]: {
        marginRight: '26px',
      },
    },
    errorBorder: {
      '& fieldset': {
        borderColor: '#FF0000',
      },
    },
    modalTypoTitle: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '23px',
    },
    modal: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      margin: '20px',
      padding: '16px',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 600,
        top: 30,
        left: 'calc(50% - 300px)',
        margin: 'inherit',
        padding: 'inherit',
      },

      // width:'fit-content'
    },
    popupPaper: {
      marginTop: '2rem',
      display: 'flex',
      height: 'fit-content',
      width: '25%',
    },
    popupPaperChangePhoneNumber: {
      marginTop: '2rem',
      display: 'flex',
      width: 300,
      height: 338,
    },
    popUpRow: {
      margin: '20px 21px 15px 20px',
    },
    popUpRowTitle: {
      display: 'flex',
      margin: '21px 21px',
      justifyContent: 'space-between',
    },
    popUpTextField: {
      marginTop: '7px',
      marginBottom: '13px',
    },
    flexBoxColumnSpaceBetween: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    popUpGridChangePass: {
      [theme.breakpoints.up('sm')]: {
        padding: '1.25rem 1.25rem',
      },
      padding: '0.5rem 0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
    },
    popupPaperChangePass: {
      marginTop: '2rem',
      display: 'flex',
      height: 'fit-content',
      width: '41rem',
    },
    passwordChangeNote: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '13px',
      lineHeight: '15px',
    },
    noteBoxPassword: {
      padding: '1rem 1rem',
      height: '97px',
    },
    noteBoxPasswordBackGround: {
      background: '#E6E8EA',
      borderRadius: '3px',
    },
    titleInput: {
      color: '#747C87',
    },
    areaContent: {
      backgroundColor: 'unset',
      borderRadius: '3px',
      marginLeft: '-16px',
      marginRight: '-16px',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    areaContentWithMarginBottom: {
      marginBottom: 30,
      borderRadius: '3px',
      backgroundColor: '#ffffff',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'unset',
        marginBottom: 'unset',
      },
    },
    linkWithSocialLink: {
      color: '#0088FF',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      position: 'absolute',
      right: '12px',
      lineHeight: 0,
    },
    registerButton: {
      backgroundColor: '#0088FF',
      color: '#ffffff',
      textTransform: 'unset',
      borderRadius: '3px',
      height: '48px',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '17px',
    },
    paper: {
      height: '45px',
      textAlign: 'center',
      justifyContent: 'center',
      margin: 'auto',
      display: 'flex',
    },
    containerContract: {
      padding: '14px 8px',
    },
    contractTitle: {
      fontWeight: 500,
      fontSize: '17px',
      color: '#343741',
      lineHeight: '21px',
    },
    tableClearBottom: {
      '&:last-child th': {
        borderBottom: 'unset',
      },
      '&:last-child td': {
        borderBottom: 'unset',
      },
    },
  });
};
export default commonStyles;
