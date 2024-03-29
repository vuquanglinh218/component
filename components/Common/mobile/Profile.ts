import { createStyles } from '@material-ui/core';
import { container } from '../../styles/material-kit-react';

const profileIndexStyles = (theme) => {
  return createStyles({
    container,
    profile: {
      textAlign: 'center',
      '& img': {
        maxWidth: '160px',
        width: '100%',
        margin: '0 auto',
        transform: 'translate3d(0, -50%, 0)',
      },
    },
    description: {
      color: '#999',
      textAlign: 'center',
      width: '100%',
    },
    name: {
      marginTop: '-25px',
      textAlign: 'center',
      fontSize: '17px',
    },
    main: {
      background: '#FFFFFF',
      position: 'relative',
      'z-index': '3',
    },
    mainRaised: {
      margin: '40px 15px 0px',
      borderRadius: '6px',
      boxShadow: ' 0px 0px 20px rgba(0, 0, 0, 0.1)',
    },
    actionViewRaised: {
      position: 'relative',
      'z-index': '3',
      margin: '15px 15px 0px',
    },
    title: {
      color: '#343741',
      margin: '1.75rem 0 0.875rem',
      fontWeight: 500,
      fontFamily: `'Helvetica Neue'`,
      display: 'inline-block',
      position: 'relative',
      marginTop: '30px',
      marginBottom: '25px',
      minHeight: '21px',
      fontSize: '17px',
      textDecoration: 'none',
    },
    socials: {
      marginTop: '0',
      width: '100%',
      transform: 'none',
      left: '0',
      top: '0',
      height: '100%',
      lineHeight: '41px',
      fontSize: '20px',
      color: '#999',
    },
    navWrapper: {
      margin: '20px auto 50px auto',
      textAlign: 'center',
    },
    header: {
      position: 'relative',
      width: '100%',
      marginTop: '30px',
      minHeight: '32px',
    },
    avatar: {
      marginTop: '-35px',
    },
    editIcon: {
      right: 10,
      top: 10,
      position: 'absolute',
    },
    doneHeader: {
      position: 'relative',
      width: '100%',
      minHeight: '32px',
      paddingRight: '12px',
      fontSize: '18px',
    },
    userInformation: {
      textAlign: 'left',
      color: '#343741',
      minHeight: '42px',
      borderBottom: '1px solid #E8EAEB',
      paddingTop: '16px',
      '& p': {
        lineHeight: '21px',
        fontSize: '14px',
        overflow: 'hidden',
      },
      '&:last-child': {
        borderBottom: 'unset',
        paddingBottom: '12px',
      },
    },
    actionView: {
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      background: '#FFFFFF',
      borderRadius: '10px',
      minHeight: '56px',
      marginTop: '12px',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '4px',
      width: '100%',
      textAlign: 'left',
    },
    actionIcon: {
      width: '44px',
      paddingTop: '8px',
    },
    actionContent: {
      width: 'calc(90% - 44px)',
      fontSize: '16px',
    },
    contentStore: {
      fontSize: '13px',
      color: '#8F9096',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    actionLink: {
      width: '10%',
      paddingTop: '8px',
      display: 'flex',
      justifyContent: 'flex-end',
      '& svg': {
        width: '10px',
        marginLeft: '8px',
      },
    },
    linkedAction: {
      textTransform: 'unset',
      display: 'flex',
      textAlign: 'center',
      paddingBottom: '16px',
      fontSize: '15px',
      lineHeight: '16px',
      '& a': {
        paddingRight: 5,
        paddingTop: 10,
        fontWeight: 500,
        width: '100%',
      },
    },
  });
};
export default profileIndexStyles;
