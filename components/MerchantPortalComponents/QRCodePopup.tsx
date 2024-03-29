import { Box, Typography } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import LogoSapo from 'components/icons/LogoSapo';

interface QRCodePopupProps extends PopupProps {}

function QRCodePopup(props: QRCodePopupProps) {
  const { ...otherProps } = props;
  return (
    <Popup maxWidth='sm' hiddenTitle hiddenAction {...otherProps}>
      <Box display='flex' width={300} flexDirection='column' alignItems='center' paddingY={8}>
        <Box display='flex' alignItems='center' gridGap={4} position='absolute' bottom={4}>
          <Typography variant='caption'>Giải pháp được cung cấp trên nền tảng</Typography>
          <LogoSapo />
        </Box>
      </Box>
    </Popup>
  );
}

export default QRCodePopup;
