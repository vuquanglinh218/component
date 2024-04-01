import { Avatar, Box, Button, Divider, Typography, createStyles, makeStyles } from '@material-ui/core';
import Countdown from './Countdown';
import Website from 'components/icons/Website';
import { Container } from 'components';
import { useTranslation } from 'next-i18next';
import moment from 'moment';

const useStyles = makeStyles(
  createStyles({
    avatar: {
      height: '72px',
      width: '72px',
    },
  }),
);

function MainSubscription() {
  const classes = useStyles();
  const { t } = useTranslation('common');

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
          <Typography variant='body2'>{t('packageService.packageService')}</Typography>
          <Typography variant='subtitle1'>Social Starup</Typography>
          <Typography variant='body2'>
            {moment('2024-03-01T02:20:52Z').format('DD/MM/YYYY')} -{' '}
            {moment('2024-03-08T17:00:00Z').format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Countdown targetDate={new Date('2024-03-08T17:00:00Z')} />
        <Button variant='contained'>{t('packageService.servicePackageRenewal')}</Button>
      </Box>
    </Container>
  );
}

export default MainSubscription;
