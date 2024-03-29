import { createStyles, Theme } from '@material-ui/core';
export let changePasswordStyle = (theme: Theme) => {
  return createStyles({
    outermostGridDisplayBlock: {
      display: 'block',
    },
    errorBorder: {
      '& fieldset': {
        borderColor: '#FF0000',
        borderWidth: '1px',
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FF0000',
        borderWidth: '1px',
      },
    },
    '& fieldset': {
      '& $notchedOutline': {
        borderWidth: 0,
      },
      '&:hover $notchedOutline': {
        borderWidth: 0,
      },
      '&$focused $notchedOutline': {
        borderWidth: 0,
      },
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
    detailPaper: {
      border: '1px solid #C4CCDE',
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
      padding: '1.25rem 1.25rem',
      display: 'flex',
      justifyContent: 'space-between',
      width: 'calc(100% + 24px)',
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% + 4px)',
      },
    },
    popupPaperChangePass: {
      marginTop: '2rem',
      display: 'flex',
      height: 'fit-content',
      width: '41rem',
      marginLeft: '16px',
      marginRight: '16px',
      [theme.breakpoints.up('sm')]: {
        margin: '75px 32px 21px 32px',
        backgroundColor: '#ffffff',
        display: 'inline-table',
        marginLeft: '0',
        marginRight: '0',
      },
    },
    gridUpdatePassword: {
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% + 28px)',
      },
    },
    passwordChangeNote: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
      paddingTop: '0.75rem',
    },
    noteBoxPassword: {
      padding: '0',
    },
    noteBoxPasswordBackGround: {},
    titleInput: {
      color: '#747C87',
    },
    buttonToolBar: {},
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
    titleInputLabel: {
      color: '#747C87',
      fontSize: 14,
      lineHeight: '16px',
    },
    inputChangePassword: {
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 'normal',
      '&::placeholder': {
        color: '#A3A8AF',
      },
    },
  });
};
