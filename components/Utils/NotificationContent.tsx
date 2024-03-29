import React, { Fragment } from 'react';
import TickIcon from '../icons/TickIcon';
import { createStyles, Typography, withStyles } from '@material-ui/core';
import InformationIcon from '../icons/InformationIcon';
import { ClassKeyOfStyles, ClassNameMap } from '@material-ui/styles/withStyles';
import theme from '../../theme';

const styles = (theme) => {
  return createStyles({
    wrapNotification: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 600,
      },
      textAlign: 'center',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    tickIconNoti: {
      width: '1.2em',
      height: '1.2em',
    },
  });
};
function NotificationContent(props: {
  content: string;
  variant: 'success' | 'error';
  classes: ClassNameMap<ClassKeyOfStyles<any>>;
}) {
  return (
    <Fragment>
      <div className={props.classes.wrapNotification}>
        {props.variant === 'success' ? (
          <TickIcon className={props.classes.tickIconNoti} viewBox='0 0 24 24' htmlColor='#FFFFFF' />
        ) : (
          <InformationIcon style={{ width: '1.2em', height: '1.2em' }} viewBox='0 0 24 24' htmlColor='#FFFFFF' />
        )}
        <Typography style={{ paddingLeft: 10 }}>{props.content}</Typography>
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(NotificationContent);
