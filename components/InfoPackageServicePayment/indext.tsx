import { Box } from '@material-ui/core';
import { Container } from 'components/SharedComponents';
import PackageServiceItem from './components/PackageServiceItem';

function InfoPackageServicePayment() {
  return (
    <Box>
      <Container title='Thông tin gói dịch vụ'>
        <PackageServiceItem summary='24 Tháng sử dụng' />
      </Container>
    </Box>
  );
}

export default InfoPackageServicePayment;
