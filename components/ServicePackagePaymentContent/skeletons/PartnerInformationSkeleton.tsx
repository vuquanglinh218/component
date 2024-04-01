import { Skeleton } from '@material-ui/lab';
import { Container, Descriptions } from 'components/SharedComponents';
import { useTranslation } from 'next-i18next';

function PartnerInformationSkeleton() {
  const { t } = useTranslation('common');
  const data = [
    {
      label: t('servicePackagePayment.customerName'),
      value: <Skeleton width={160} />,
    },
    {
      label: t('servicePackagePayment.phoneNumber'),
      value: <Skeleton width={160} />,
    },
    {
      label: t('servicePackagePayment.email'),
      value: <Skeleton width={160} />,
    },

    {
      label: t('servicePackagePayment.siteName'),
      value: <Skeleton width={160} />,
    },
  ];
  return (
    <Container title={t('servicePackagePayment.partnerInformation')}>
      <Descriptions data={data} />
    </Container>
  );
}

export default PartnerInformationSkeleton;
