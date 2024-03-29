import { createStyles, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ReactNode } from 'react';

interface AlertInfoProps {
  title: string | ReactNode;
  body: string | ReactNode;
}

const useStyles = makeStyles(
  createStyles({
    outlinedInfo: {
      borderRadius: 6,
      backgroundColor: '#F2F9FF',
    },
  }),
);

function AlertInfo(props: AlertInfoProps) {
  const { title, body } = props;
  const classes = useStyles();
  return (
    <Alert severity='info' variant='outlined' classes={{ outlinedInfo: classes.outlinedInfo }}>
      <AlertTitle>{title}</AlertTitle>
      {body}
    </Alert>
  );
}

export default AlertInfo;
