import { createStyles, Theme } from '@material-ui/core';

let accessibleTenantsStyles = (theme: Theme) => {
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
      [theme.breakpoints.up('sm')]: {
        border: '1px solid #C4CCDE',
      },
    },
    detailPaperWithBorder: {
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
    gradientButton: {
      width: '15rem',
      height: '3rem',
      fontSize: '18px',
      fontWeight: 500,
      borderRadius: '30px',
      border: 'unset',
      color: 'white',
      background: 'linear-gradient(90deg, rgba(39,210,142,1) 50%, rgba(14,206,173,1) 100%)',
    },
    tenantItemRow: {
      padding: 15,
    },
    accessButtonGrid: {
      textAlignLast: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    dividerStyle: {
      width: '100%',
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
    areaContent: {
      backgroundColor: 'unset',
      borderRadius: '3px',
      marginLeft: '-16px',
      marginRight: '-16px',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    detailPaperSocial: {
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
  });
};
export default accessibleTenantsStyles;
