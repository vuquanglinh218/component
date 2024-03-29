import { Container } from 'components/SharedComponents';
import ServicePackageItem from './ServicePackageItem';

function ServicePackageInformation() {
  return (
    <Container title='Thông tin gói dịch vụ'>
      <ServicePackageItem summary='12 tháng sử dụng' isActive />
    </Container>
  );
}

export default ServicePackageInformation;
