import Success from 'components/icons/Success';
import Popup, { PopupProps } from './Popup';
import { Box, Link, Typography } from '@material-ui/core';

interface PaymentSuccessPopupProps extends PopupProps {
  onConfirm?: () => Promise<void> | void;
}

function PaymentSuccessPopup(props: PaymentSuccessPopupProps) {
  const { onConfirm, ...otherProps } = props;

  return (
    <Popup hiddenTitle hiddenAction hiddenBtnClose maxWidth='sm' {...otherProps}>
      <Box display='flex' flexDirection='column' alignItems='center' paddingY={8}>
        <Success />
        <Typography variant='subtitle2'>Thanh toán thành công!</Typography>
        <Typography variant='body2' align='center'>
          Giao dịch của bạn đã được thanh toán thành công.
          <br /> Sapo đang xử lý giao dịch & sẽ gửi thông báo sau khi việc gia hạn/
          <br /> nâng cấp hoàn tất qua email 
          <Typography variant='body2' color='primary' component='span'>
            locnt@sapo.vn
          </Typography>
          <br /> Bạn có thể xem chi tiết tình trạng trong 
          <Link display='inline' onClick={onConfirm}>
            thông tin gói dịch vụ
          </Link>
        </Typography>
      </Box>
    </Popup>
  );
}

export default PaymentSuccessPopup;
