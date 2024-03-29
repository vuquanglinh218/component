import React from 'react';
import { Box, Button, Paper, Typography, withStyles, WithStyles } from '@material-ui/core';

import { promoInformation } from './style';
import CheckIcon from '@material-ui/icons/Check';

interface PromoInformationProps extends WithStyles<any> {
  promos?: Array<string>;
}

function PromoInformation(props: PromoInformationProps) {
  const { classes, promos = ['Tặng 6 tháng sử dụng', 'Chiết khấu 20%', 'Miễn phí khởi tạo'] } = props;
  return (
    <Box>
      {promos.map((promos) => {
        return (
          <Box className={classes.item}>
            <CheckIcon className={classes.icon} />
            <Typography className={classes.text} variant='body2'>
              {promos}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default withStyles(promoInformation)(PromoInformation);
