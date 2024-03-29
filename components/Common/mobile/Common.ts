import { createStyles } from '@material-ui/core';
import { container } from '../../styles/material-kit-react';

const commonMobileStyles = (theme) => {
  return createStyles({
    container,
    appBar: {
      backgroundColor: 'white',
      height: 44,
      boxShadow: 'unset',
      filter: 'drop-shadow(0px 5px 10px rgba(52, 55, 65, 0.1))',
      display: 'flex',
      justifyContent: 'center',
    },
    titleAccountDetail: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
    },
    menuButton: {},
    titleLabel: {
      fontWeight: 500,
      fontSize: '17px',
      color: '#343741',
    },
    mainContainer: {
      paddingTop: '16px',
      backgroundColor: '#fff',
      overflowX: 'hidden',
      height: '100%',
    },
    popupPaper: {
      margin: '5rem 32px 0 32px',
      display: 'flex',
      height: '65vh',
    },
    inputSearch: {
      backgroundColor: '#F6F7FB',
      paddingLeft: '8px',
      width: 'auto',
      marginTop: '-5px',
    },
    listLocationItem: {
      borderBottom: '1px solid #E4E4E4',
      margin: '0 16px',
      paddingLeft: 0,
      paddingRight: 0,
      width: 'auto',
    },
  });
};
export default commonMobileStyles;
