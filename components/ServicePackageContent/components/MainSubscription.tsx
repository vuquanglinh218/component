import { Avatar, Box, Button, Divider, Typography, createStyles, makeStyles } from '@material-ui/core';
import Countdown from './Countdown';
import Website from 'components/icons/Website';
import { Container } from 'components';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useGetStore } from 'swr_api';

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
  const router = useRouter();

  const { domain } = router.query;

  const { dataStore, isLoadingStore } = useGetStore(domain as string);

  const title = (
    <Box display='flex' alignItems='center' gridGap={4}>
      <Website />
      {!isLoadingStore && <Typography variant='body2'>{dataStore?.domain_name}</Typography>}
    </Box>
  );

  const handleRenewal = () => {
    router.push(`/stores/renewal-price-list?categoryId=${dataStore.product_category_id}&domain=${domain}`);
  };

  return (
    <>
      {!isLoadingStore && (
        <Container title={title} variantTitle='body2'>
          <Divider />
          <Box display='flex' alignItems='center' gridGap={12} marginTop='20px'>
            <Avatar classes={{ root: classes.avatar }} />
            <Box flex={1} display='flex' flexDirection='column' justifyContent='space-between'>
              <Typography variant='body2'>{t('packageService.packageService')}</Typography>
              <Typography variant='subtitle1'>{dataStore?.package_description}</Typography>
              <Typography variant='body2'>
                {moment(dataStore?.start_date).format('DD/MM/YYYY')} -{' '}
                {moment(dataStore?.end_date).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Countdown targetDate={new Date(dataStore?.end_date)} />
            <Button variant='contained' onClick={handleRenewal}>
              {t('packageService.servicePackageRenewal')}
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
}

export default MainSubscription;
