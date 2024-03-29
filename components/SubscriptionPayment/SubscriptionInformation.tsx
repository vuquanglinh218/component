import React from 'react';
import { Box, Button, Paper, Typography, withStyles, WithStyles } from '@material-ui/core';

import { subscriptionInformation } from './style';

interface SubscriptionInformationProps extends WithStyles<any> {}

function SubscriptionInformation(props: SubscriptionInformationProps) {
  const { classes } = props;
  return (
    <Paper className={classes.container}>
      <Box>
        <Typography className={classes.blockHeader} variant='body1'>
          Thông tin gói dịch vụ
        </Typography>
        <Box className={classes.blockContent}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='body2'>Chi nhánh (9 tháng)</Typography>
            <Typography variant='body2'>1,300,000đ</Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='body2'>Tặng 6 tháng</Typography>
            <Typography variant='body2'>0đ</Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='body2'>Chiết khấu (20%)</Typography>
            <Typography variant='body2'>-306,000đ</Typography>
          </Box>
        </Box>
      </Box>

      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant='body2'>Tổng tiền thanh toán</Typography>
        <Typography className={classes.totalPrice}>924,000đ</Typography>
      </Box>

      <Button className={classes.button} variant='contained' color='primary'>
        Tiếp tục
      </Button>
    </Paper>
  );
}

export default withStyles(subscriptionInformation)(SubscriptionInformation);
