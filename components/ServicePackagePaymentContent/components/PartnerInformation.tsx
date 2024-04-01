import { Box, Typography } from '@material-ui/core';
import { Container, Descriptions } from 'components/SharedComponents';
import Website from 'components/icons/Website';
import { useTranslation } from 'next-i18next';

const dataDemo = [
  {
    label: 'Tên khách hàng',
    value: 'Nguyễn Bảo Anh',
  },
  {
    label: 'Số điện thoại',
    value: '0981701198',
  },
  {
    label: 'Email',
    value: 'baoanhnguyen@gmail.com',
  },

  {
    label: 'Tên site/ID cửa hàng',
    value: (
      <Box display='flex' alignItems='center' gridGap={4}>
        <Website />
        <Typography variant='body1'>Bepjang2020</Typography>
      </Box>
    ),
  },
];

function PartnerInformation() {
  const { t } = useTranslation('common');

  return (
    <Container title={t('servicePackagePayment.partnerInformation')}>
      <Descriptions data={dataDemo} />
    </Container>
  );
}

export default PartnerInformation;
