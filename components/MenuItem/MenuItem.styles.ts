import { createStyles } from '@material-ui/core';

const menuItemStyles = createStyles({
  menuItemTypo: {
    fontWeight: 400,
    fontSize: 14,
    marginRight: '4rem',
    width: 'max-content',
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
});
export default menuItemStyles;
