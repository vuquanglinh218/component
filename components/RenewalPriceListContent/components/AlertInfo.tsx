import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ReactNode } from 'react';

interface AlertInfoProps {
  title: string | ReactNode;
  body: string | ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outlinedInfo: {
      borderRadius: 6,
      backgroundColor: '#F2F9FF',
    },
    message: {
      ...theme.typography.body1,
    },
    alertTitleRoot: {
      ...theme.typography.h6,
    },
  }),
);

function AlertInfo(props: AlertInfoProps) {
  const { title, body } = props;
  const classes = useStyles();

  return (
    <Alert
      severity='info'
      variant='outlined'
      classes={{ message: classes.message, outlinedInfo: classes.outlinedInfo }}
    >
      <AlertTitle classes={{ root: classes.alertTitleRoot }}>{title}</AlertTitle>
      {body}
    </Alert>
  );
}

export default AlertInfo;
