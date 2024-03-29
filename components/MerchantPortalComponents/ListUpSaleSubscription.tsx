import { Box, Button, Card, Grid, Theme, Typography, makeStyles } from '@material-ui/core';
import Container from './Container';

interface ListUpSaleSubscriptionProps {}
interface UpSaleSubscriptionItemProps {}

const useStylesItem = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: 6,
  },
}));

function UpSaleSubscriptionItem(props: UpSaleSubscriptionItemProps) {
  const classes = useStylesItem();
  return (
    <Card variant='outlined' classes={{ root: classes.root }}>
      <Box display='flex' flexDirection='column' gridGap={8}>
        <Typography variant='h6'>Chi nhánh</Typography>
        <Typography variant='subtitle1'>
          160.000
          <Typography variant='body2' component='span'>
            /chi nhánh/tháng
          </Typography>
        </Typography>
        <Box>
          <Button variant='outlined'>Mua thêm</Button>
        </Box>
      </Box>
    </Card>
  );
}

function ListUpSaleSubscription(props: ListUpSaleSubscriptionProps) {
  return (
    <Container title='Dịch vụ mua thêm'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
        <Grid item xs={4}>
          <UpSaleSubscriptionItem />
        </Grid>
      </Grid>
    </Container>
  );
}
export default ListUpSaleSubscription;
