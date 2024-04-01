import { Box, Button, Typography } from '@material-ui/core';
import { Container, Descriptions } from 'components/SharedComponents';
import { useTranslation } from 'next-i18next';

const dataDemo = [
  {
    label: '4x Dung lượng (9tháng)',
    value: '1,300,000đ',
  },
  {
    label: 'Chiết khấu(15%)',
    value: '-306,000đ',
  },
  {
    label: 'Thuế',
    value: '14,000đ',
  },
];

interface InvoiceProps {
  onClick: () => Promise<void> | void;
}

function Invoice(props: InvoiceProps) {
  const { onClick } = props;
  const { t } = useTranslation('common');

  return (
    <Container title={t('servicePackagePayment.order')}>
      <Descriptions data={dataDemo} />

      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Typography variant='body1'>{t('servicePackagePayment.totalPayment')}</Typography>
        <Typography variant='subtitle1'>810.000đ</Typography>
      </Box>

      <Button variant='contained' size='large' fullWidth onClick={onClick}>
        {t('servicePackagePayment.continue')}
      </Button>
    </Container>
  );
}

export default Invoice;
