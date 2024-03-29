import { Box, Typography } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import ContactIcon from 'components/icons/ContactIcon';

interface ContactPopupProps extends PopupProps {
  staffInfo: {
    name: string;
    phoneNumber: string;
  };
}

function ContactPopup(props: ContactPopupProps) {
  const { staffInfo, ...otherProps } = props;
  return (
    <Popup hiddenTitle hiddenAction maxWidth='md' {...otherProps}>
      <Box display='flex' flexDirection='column' alignItems='center' width={460} gridGap={4}>
        <Box marginBottom='20px'>
          <ContactIcon />
        </Box>
        <Typography variant='body1'>Anh/chị vui lòng liên hệ</Typography>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='body1'>Chuyên viên tư vấn: {staffInfo.name}</Typography>
          <Typography variant='subtitle1'>{staffInfo.phoneNumber}</Typography>
        </Box>
        <Typography variant='body1'>Hoặc tổng đài: 1900 6750 để được hỗ trợ</Typography>
      </Box>
    </Popup>
  );
}

export default ContactPopup;
