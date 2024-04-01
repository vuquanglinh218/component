import { Box, Typography, createStyles, makeStyles } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import LogoSapo from 'components/icons/LogoSapo';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface CountdownProps {
  targetDate: Date;
  onExpired: () => Promise<void> | void;
}
interface QRCodePopupProps extends PopupProps, CountdownProps {
  imageQR: string;
}

const useStyles = makeStyles(
  createStyles({
    containerCountdown: {
      backgroundColor: '#F3F4F5',
      width: '100%',
      height: '72px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      borderRadius: 6,
    },
    containerTimeItem: {
      backgroundColor: '#E8EAEB',
      padding: '6px 6px',
      borderRadius: 6,
      minWidth: 32,
    },
  }),
);

function Countdown(props: CountdownProps) {
  const { targetDate, onExpired } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timerID = setInterval(() => {
      if (targetDate < new Date()) {
        onExpired();
        clearInterval(timerID);
      }
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  function calculateRemainingTime() {
    const now = moment();
    const endDate = moment(targetDate);
    const duration = moment.duration(endDate.diff(now));
    return duration;
  }

  return (
    <Box className={classes.containerCountdown}>
      <Typography variant='body2'>{t('popup.QRCode.expiredMessage')}</Typography>
      <Box display='flex' justifyContent='center' alignItems='center' gridGap={4}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gridGap={2}
          className={classes.containerTimeItem}
        >
          <Typography>{remainingTime.minutes() > 0 ? remainingTime.minutes() : 0}</Typography>
        </Box>
        <Typography>:</Typography>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gridGap={2}
          className={classes.containerTimeItem}
        >
          <Typography>{remainingTime.seconds() > 0 ? remainingTime.seconds() : 0}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function QRCodePopup(props: QRCodePopupProps) {
  const { onClose, targetDate, onExpired, imageQR, ...otherProps } = props;
  const { t } = useTranslation('common');

  return (
    <Popup maxWidth='md' hiddenTitle hiddenAction {...otherProps} onClose={onClose}>
      <Box display='flex' width={300} flexDirection='column' alignItems='center' gridGap={12}>
        <Typography variant='body1'>{t('popup.QRCode.title')}</Typography>
        <img style={{ objectFit: 'cover', width: '300px' }} src={`data:image/png;base64,${imageQR}`} />
        <Countdown
          // targetDate={new Date(new Date().getTime() + 0.2 * 60000)}
          targetDate={targetDate}
          onExpired={onExpired}
        />
        <Box display='flex' alignItems='center' gridGap={4}>
          <Typography variant='caption'>{t('popup.QRCode.footer')}</Typography>
          <LogoSapo />
        </Box>
      </Box>
    </Popup>
  );
}

export default QRCodePopup;
