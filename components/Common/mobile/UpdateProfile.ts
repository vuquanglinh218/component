import { createStyles } from '@material-ui/core';
import { container } from '../../styles/material-kit-react';

const updateProfileStyles = (theme) => {
  return createStyles({
    container,
    content: {
      padding: '12px 0 0 0',
      display: 'flex',
      justifyContent: 'space-between',
    },
    titleInput: {
      color: '#8F9096',
      fontSize: '13px',
    },
    flexBoxColumnSpaceBetween: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& input': {
        fontWeight: 500,
        opacity: 1,
      },
      '& span': {
        paddingRight: '4px',
      },
    },
    flexBoxColumnSpaceBetweenGender: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& input': {
        fontWeight: 500,
      },
      '& span': {
        paddingRight: '4px',
      },
    },
    disabled: {
      backgroundColor: '#F6F7FB',
      borderRadius: '10px 10px 0px 0px',
      margin: '8px',
      padding: '6px 8px 0px 8px',
      '& .Mui-disabled:before': {
        borderBottom: 'unset',
      },
    },
    actionLink: {
      width: '7%',
      '& svg': {
        width: '10px',
        marginLeft: '8px',
      },
    },
    actionView: {
      boxShadow: 'unset',
      background: 'inherit',
      borderRadius: '0',
      display: 'flex',
      alignItems: 'flex-start',
      padding: '4px 0',
      width: '100%',
      textAlign: 'left',
      transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    },
    unsetBorder: {
      border: 'unset',
    },
    passwordChangeNote: {
      fontSize: '12px',
      lineHeight: '18px',
      color: '#8F9096',
    },
    hiddenStore: {
      minHeight: '50px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '16px',
      paddingTop: '11px',
      '& svg': {
        paddingTop: '5px',
      },
    },
    borderTop: {
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
    borderBottom: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    mainArea: {
      backgroundColor: '#fff',
      padding: '0 16px',
    },
    autoWHSvg: {
      '& svg': {
        width: '1em',
        height: '1em',
      },
    },
    fontSize16: {
      fontSize: '16px',
      '& input': {
        fontSize: '16px',
      },
    },
    fontWeightNormal: {
      fontWeight: 'normal',
      '& input': {
        fontWeight: 'normal',
      },
    },
    dobInput: {
      marginTop: '0.5rem',
      width: '100%',
      '& input': {
        fontSize: '16px',
        fontWeight: 'normal',
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
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '16px',
    },
    modal: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      width: 'fit-content',
    },
    popUpGridChangePass: {
      [theme.breakpoints.up('sm')]: {
        padding: '1.25rem 1.25rem',
      },
      display: 'flex',
      justifyContent: 'space-between',
    },
    modalTypoTitle: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '23px',
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
    overrideScrollPaper: {
      alignItems: 'baseline',
    },
    overridePaper: {
      margin: '64px 16px 16px 16px',
      padding: '8px',
    },
    buttonLabelFit: {
      whiteSpace: 'nowrap',
    },
  });
};
export default updateProfileStyles;
