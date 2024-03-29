import React, { Fragment, ReactNode } from 'react';
import { AppBar, IconButton, Toolbar, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import commonMobileStyles from '../Common/mobile/Common';
import { useRouter } from 'next/router';
import { CloseIcon, GoBackIcon, TickIcon } from '../icons/mobile';
import { MobileHeaderProps } from '../Common/mobile/MobileProps';

function MobileHeader(props: MobileHeaderProps) {
  const { classes } = props;
  const router = useRouter();
  const iconLeft = () => {
    if (props.leftArea) {
      if (React.isValidElement(props.leftArea.content)) return props.leftArea.content;
      let actionLeft = props.leftArea.action ? props.leftArea.action() : () => router.push(`/m`);
      let icon: any = <GoBackIcon />;
      if (props.leftArea.content === 'close') icon = <CloseIcon />;
      return (
        <IconButton color='inherit' edge='start' onClick={actionLeft} className={classes.menuButton}>
          {icon}
        </IconButton>
      );
    }
    return <span />;
  };
  const iconRight = () => {
    if (props.rightArea) {
      if (React.isValidElement(props.rightArea.content)) return props.rightArea.content;
      return (
        <IconButton color='inherit' edge='end' onClick={props.rightArea.action()} className={classes.menuButton}>
          <TickIcon />
        </IconButton>
      );
    }
    return <span />;
  };
  return (
    <AppBar position='fixed' className={classes.appBar} style={props.appBarStyle}>
      <Toolbar className={classes.titleAccountDetail}>
        {iconLeft()}
        <Typography className={classes.titleLabel}>{props.title}</Typography>
        {iconRight()}
      </Toolbar>
      {props.stickyElement}
    </AppBar>
  );
}

export default withStyles(commonMobileStyles)(MobileHeader);
