import { Box, Button, ButtonGroup, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
import Container from './Container';
import StoreItem from './StoreItem';
import { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonDisabled: {
      color: theme.palette.grey[400],
    },
  }),
);

function ListTenant() {
  const [status, setStatus] = useState<'trail' | 'paid'>('trail');

  const classes = useStyles();
  const handleFilterTrail = () => {
    setStatus('trail');
  };

  const handleFilterPaid = () => {
    setStatus('paid');
  };

  return (
    <Container title='Truy cập và quản lý các cửa hàng được kết nối với tài khoản đăng nhập.' variantTitle='body2'>
      <Box marginBottom='12px'>
        <ButtonGroup variant='text'>
          <Button classes={{ root: clsx(status !== 'paid' && classes.buttonDisabled) }} onClick={handleFilterPaid}>
            Trả phí
          </Button>
          <Button classes={{ root: clsx(status !== 'trail' && classes.buttonDisabled) }} onClick={handleFilterTrail}>
            Dùng thử
          </Button>
        </ButtonGroup>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StoreItem disabled type='paid' />
        </Grid>
        <Grid item xs={4}>
          <StoreItem isLoading />
        </Grid>
        <Grid item xs={4}>
          <StoreItem />
        </Grid>
        <Grid item xs={4}>
          <StoreItem />
        </Grid>
        <Grid item xs={4}>
          <StoreItem />
        </Grid>
        <Grid item xs={4}>
          <StoreItem />
        </Grid>
        <Grid item xs={4}>
          <StoreItem />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListTenant;
