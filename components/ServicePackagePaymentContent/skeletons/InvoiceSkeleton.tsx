import { Box, Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Container, Descriptions } from 'components/SharedComponents';
import { useTranslation } from 'next-i18next';

function InvoiceSkeleton() {
  const { t } = useTranslation('common');
  return (
    <Container title={t('servicePackagePayment.order')}>
      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Skeleton width={400} />
      </Box>
      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Skeleton width={400} />
      </Box>{' '}
      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Skeleton width={400} />
      </Box>{' '}
      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Skeleton width={400} />
      </Box>
      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Skeleton width={400} />
      </Box>
      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Skeleton width={400} />
      </Box>
      <Button variant='contained' size='large' fullWidth disabled>
        {t('servicePackagePayment.continue')}
      </Button>
    </Container>
  );
}

export default InvoiceSkeleton;
