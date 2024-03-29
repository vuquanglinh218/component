import { Box, Typography } from '@material-ui/core';
import Container from './Container';
import Descriptions from './Descriptions';
import Website from 'components/icons/Website';

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
  return (
    <Container title='Thông tin khách hàng'>
      <Descriptions data={dataDemo} />
    </Container>
  );
}

export default PartnerInformation;
