import { CircularProgress, Typography, createStyles, makeStyles } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import { ReactNode } from 'react';

interface LoadingPopupProps extends PopupProps {
  message?: string | ReactNode;
}

const useStyles = makeStyles(
  createStyles({
    dialogContentRoot: {
      minWidth: 500,
      minHeight: 420,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
    },
  }),
);

const Message = (
  <Typography align='center'>
    Hệ thống đang tạo mã QR <br /> Xin vui lòng chờ trong giây lát
  </Typography>
);

function LoadingPopup(props: LoadingPopupProps) {
  const { message = Message, ...otherProps } = props;
  const classes = useStyles();

  return (
    <Popup
      title=''
      hiddenTitle
      hiddenAction
      dialogContentProps={{ classes: { root: classes.dialogContentRoot } }}
      {...otherProps}
    >
      <CircularProgress />
      {message}
    </Popup>
  );
}

export default LoadingPopup;
