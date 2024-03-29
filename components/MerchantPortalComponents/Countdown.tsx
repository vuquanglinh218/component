import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Typography } from '@material-ui/core';

interface CountdownProps {
  targetDate: Date;
}

function Countdown(props: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const { targetDate } = props;

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
        <Typography variant='subtitle1' style={{ color: '#DB7300' }}>
          {remainingTime.days()}
        </Typography>
        <Typography variant='body1'>Ngày</Typography>
      </Box>
      <Box
        display='flex'
        width={55}
        flexDirection='column'
        alignItems='center'
        gridGap={2}
        style={{ borderLeft: '1px solid #E8EAEB' }}
      >
        <Typography variant='subtitle1' style={{ color: '#DB7300' }}>
          {remainingTime.hours()}
        </Typography>
        <Typography variant='body1'>Giờ</Typography>
      </Box>
      <Box
        display='flex'
        width={55}
        flexDirection='column'
        alignItems='center'
        gridGap={2}
        style={{ borderLeft: '1px solid #E8EAEB' }}
      >
        <Typography variant='subtitle1' style={{ color: '#DB7300' }}>
          {remainingTime.minutes()}
        </Typography>
        <Typography variant='body1'>Phút</Typography>
      </Box>
      <Box
        display='flex'
        width={55}
        flexDirection='column'
        alignItems='center'
        gridGap={2}
        style={{ borderLeft: '1px solid #E8EAEB' }}
      >
        <Typography variant='subtitle1' style={{ color: '#DB7300' }}>
          {remainingTime.seconds()}
        </Typography>
        <Typography variant='body1'>Giây</Typography>
      </Box>
    </Box>
  );
}

export default Countdown;
