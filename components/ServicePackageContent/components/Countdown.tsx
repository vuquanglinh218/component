import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Typography, createStyles, makeStyles } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

interface CountdownProps {
  targetDate: Date;
}

const useStyles = makeStyles(
  createStyles({
    borderDividers: {
      borderLeft: '1px solid #E8EAEB',
    },
    textColor: {
      color: '#DB7300',
    },
  }),
);

function Countdown(props: CountdownProps) {
  const { targetDate } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timerID = setInterval(() => {
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
    <Box display='flex'>
      <Box display='flex' width={55} flexDirection='column' alignItems='center' gridGap={2}>
        <Typography variant='subtitle1' classes={{ root: classes.textColor }}>
          {remainingTime.days() > 0 ? remainingTime.days() : 0}
        </Typography>
        <Typography variant='body1'>{t('countdown.day')}</Typography>
      </Box>
      <Box
        display='flex'
        width={55}
        flexDirection='column'
        alignItems='center'
        gridGap={2}
        className={classes.borderDividers}
      >
        <Typography variant='subtitle1' classes={{ root: classes.textColor }}>
          {remainingTime.hours() > 0 ? remainingTime.hours() : 0}
        </Typography>
        <Typography variant='body1'>{t('countdown.hour')}</Typography>
      </Box>
      <Box
        display='flex'
        width={55}
        flexDirection='column'
        alignItems='center'
        gridGap={2}
        className={classes.borderDividers}
      >
        <Typography variant='subtitle1' classes={{ root: classes.textColor }}>
          {remainingTime.minutes() > 0 ? remainingTime.minutes() : 0}
        </Typography>
        <Typography variant='body1'>{t('countdown.minute')}</Typography>
      </Box>
      <Box
        display='flex'
        width={55}
        flexDirection='column'
        alignItems='center'
        gridGap={2}
        className={classes.borderDividers}
      >
        <Typography variant='subtitle1' classes={{ root: classes.textColor }}>
          {remainingTime.seconds() > 0 ? remainingTime.seconds() : 0}
        </Typography>
        <Typography variant='body1'>{t('countdown.second')}</Typography>
      </Box>
    </Box>
  );
}

export default Countdown;
