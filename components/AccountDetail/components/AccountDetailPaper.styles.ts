import { createStyles } from '@material-ui/core';

let commonStyles = (theme) => {
  return createStyles({
    outermostGridDisplayBlock: {
      display: 'block',
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
    grandFatherGridPaddingConnectSocial: {
      margin: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        margin: '1rem 0rem',
      },
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    detailPaperSocial: {
      border: '1px solid #C4CCDE',
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
      backgroundColor: '#ffffff',
      borderRadius: '3px',
      marginLeft: '-16px',
      marginRight: '-16px',
      paddingLeft: '16px',
      paddingRight: '16px',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'unset',
      },
    },
    areaContentWithMarginBottom: {
      marginBottom: 30,
      borderRadius: '3px',
      marginLeft: '-16px',
      marginRight: '-16px',
      paddingLeft: '16px',
      paddingRight: '16px',
      backgroundColor: '#ffffff',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'unset',
        marginBottom: 'unset',
      },
    },
    appBarUpdate: {
      backgroundColor: 'white',
      height: 52,
    },
    buttonAppBarUpdate: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 20,
      paddingTop: 4,
      [theme.breakpoints.up('sm')]: {
        paddingRight: 40,
      },
    },
    buttonSubmitUpdate: {
      margin: 'unset',
      borderRadius: 3,
      marginLeft: '0.5em',
      background: '#007BFF',
      border: '1px solid #C4CCDE',
      boxShadow: 'unset',
      height: 40,
      width: 80,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '16px',
    },
    buttonCancelUpdate: {
      margin: 'unset',
      borderRadius: 3,
      marginLeft: '0.5em',
      background: '#ffffff',
      border: '1px solid #0088FF',
      color: '#0088FF',
      boxShadow: 'unset',
      height: 40,
      width: 80,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '16px',
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
  });
};
export default commonStyles;
