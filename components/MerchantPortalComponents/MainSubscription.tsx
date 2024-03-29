import { Avatar, Box, Button, Divider, Typography, makeStyles } from '@material-ui/core';
import Container from './Container';
import Countdown from './Countdown';
import Website from 'components/icons/Website';

interface MainSubscriptionProps {}

const useStyles = makeStyles({
  avatar: {
    height: '72px',
    width: '72px',
  },
});

function MainSubscription(props: MainSubscriptionProps) {
  const { ...otherProps } = props;

  const classes = useStyles();
  const title = (
    <Box display='flex' alignItems='center' gridGap={4}>
      <Website />
      <Typography variant='body2'>Bepjang2020</Typography>
    </Box>
  );

  return (
    <Container title={title} variantTitle='body2'>
      <Divider />
      <Box display='flex' alignItems='center' gridGap={12} marginTop='20px'>
        <Avatar classes={{ root: classes.avatar }} />
        <Box flex={1} display='flex' flexDirection='column' justifyContent='space-between'>
          <Typography variant='body2'>Gói dịch vụ:</Typography>
          <Typography variant='subtitle1'>Social Starup</Typography>
          <Typography variant='body2'>10/10/2023 - 10/10/2023</Typography>
        </Box>
        <Countdown targetDate={new Date('2024-12-31T23:59:59')} />
        <Button variant='contained'>Gia hạn gói dịch vụ</Button>
      </Box>
    </Container>
  );
}

export default MainSubscription;
