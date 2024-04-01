import React, { Fragment } from 'react';
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import UserIcon from '../icons/UserIcon';
import LogoutIcon from '../icons/LogoutIcon';
import Link from 'next/link';
import clsx from 'clsx';
import StoreIcon from '../icons/StoreIcon';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import MenuHamburger from '../icons/MenuHamburger';
import { useTranslation } from 'next-i18next';
import MenuItem from '../MenuItem/MenuItem';
import ContractIcon from '../icons/ContractIcon';
import { NextClientService } from '../../services/NextClientService';
import NavigationHeader, { NavigationHeaderProps } from './NavigationHeader';
import HistoryIcon from 'components/icons/HistoryIcon';

function NavBar(
  props: WithStyles<any> & {
    window: any;
    username: string;
    title: string;
    hiddenContract?: boolean;
    navigationHeaderProps?: NavigationHeaderProps;
  },
) {
  const { classes, window, username, title, hiddenContract, navigationHeaderProps } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { t } = useTranslation('common');
  const theme = useTheme();
  const router = useRouter();
  const container = window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <Fragment>
      <List disablePadding className={classes.drawerlist}>
        <ListItem className={classes.headerItem}>
          <Typography className={classes.typo}>{t('pageTitle')}</Typography>
        </ListItem>
        <Divider />
        <MenuItem href='/accounts' prefetch={true} Icon={UserIcon} textKey='account.title' />
        <MenuItem href='/stores' prefetch={true} Icon={StoreIcon} textKey='store.title' />
        {/* {hiddenContract ? (
          ''
        ) : (
          <MenuItem href='/contracts' prefetch={true} Icon={ContractIcon} textKey='contract.title' />
        )} */}
        <MenuItem href='/purchase-history' prefetch={true} Icon={HistoryIcon} textKey='Lịch sử giao dịch' />
      </List>
      <List className={clsx(classes.routerMenu, classes.logoutButton)}>
        <MenuItem
          href='javascript:void(0)'
          onClick={() => {
            NextClientService.logout().then((res) => {
              router.push(res.data.redirect).then();
            });
          }}
          Icon={LogoutIcon}
          style={{ paddingLeft: '8px' }}
          textKey='action.logout'
        />
      </List>
    </Fragment>
  );
  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.titleAccountDetail}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuHamburger />
          </IconButton>
          <Typography className={classes.titleLabel}>{title}</Typography>
          <div className={classes.userNameLabel}>
            <Avatar name={username} maxInitials={1} size='35' round={true} />
            <Typography className={classes.nameLabel} style={{ fontWeight: 500 }}>
              {username}
            </Typography>
          </div>
        </Toolbar>
        {navigationHeaderProps && <NavigationHeader {...navigationHeaderProps} />}
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withStyles(styles)(NavBar);
