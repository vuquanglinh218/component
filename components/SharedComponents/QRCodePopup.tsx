import { Box, Typography, makeStyles } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import LogoSapo from 'components/icons/LogoSapo';
import { useTranslation } from 'next-i18next';
import ImageQRTest from './ImageQRTest';
import { useEffect, useState } from 'react';

interface QRCodePopupProps extends PopupProps {}

function CountDown() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);
  return (
    <Box>
      <Typography>{count}</Typography>
    </Box>
  );
}

function QRCodePopup(props: QRCodePopupProps) {
  const { ...otherProps } = props;
  const { t } = useTranslation('common');
  return (
    <Popup maxWidth='md' hiddenTitle hiddenAction {...otherProps}>
      <Box display='flex' width={300} flexDirection='column' alignItems='center' gridGap={12}>
        <Typography variant='body1'>Mở ứng dụng ngân hàng, quét QR để thanh toán</Typography>
        <ImageQRTest />
        <CountDown />
        <Box display='flex' alignItems='center' gridGap={4}>
          <Typography variant='caption'>{t('popup.QRCode.footer')}</Typography>
          <LogoSapo />
        </Box>
      </Box>
    </Popup>
  );
}

export default QRCodePopup;
