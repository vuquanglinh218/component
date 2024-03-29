import { Box, Button, Typography } from '@material-ui/core';
import { Container, Descriptions } from 'components/SharedComponents';

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

function Invoice() {
  return (
    <Container title='Đơn hàng'>
      <Descriptions data={dataDemo} />

      <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
        <Typography variant='body1'>Tổng tiền thanh toán</Typography>
        <Typography variant='subtitle1'>810.000đ</Typography>
      </Box>

      <Button variant='contained' size='large' fullWidth>
        Tiếp tục
      </Button>
    </Container>
  );
}

export default Invoice;
