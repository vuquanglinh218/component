import { Container } from 'components/SharedComponents';
import ServicePackageItem from './ServicePackageItem';
import { useTranslation } from 'next-i18next';

function ServicePackageInformation() {
  const { t } = useTranslation('common');

  return (
    <Container title={t('servicePackagePayment.servicePackageInformation')}>
      <ServicePackageItem summary='12 tháng sử dụng' isActive />
    </Container>
  );
}

export default ServicePackageInformation;
