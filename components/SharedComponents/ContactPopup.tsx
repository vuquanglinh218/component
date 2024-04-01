import { Box, Typography } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import ContactIcon from 'components/icons/ContactIcon';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

interface ContactPopupProps extends PopupProps {
  staffInfo: {
    name: string;
    phoneNumber: string;
  };
}

function ContactPopup(props: ContactPopupProps) {
  const { staffInfo, ...otherProps } = props;
  const { t } = useTranslation('common');

  return (
    <Popup hiddenTitle hiddenAction maxWidth='md' {...otherProps}>
      <Box display='flex' flexDirection='column' alignItems='center' width={460} gridGap={4}>
        <Box marginBottom='20px'>
          <ContactIcon />
        </Box>
        <Typography variant='body1'>{t('popup.contact.body1')}</Typography>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='body1'>
            {t('popup.contact.body2')}{' '}
            <Typography variant='h6' component='span'>
              {staffInfo.name}
            </Typography>
          </Typography>
          <Box display='flex' alignItems='center'>
            <Box display='flex' alignItems='center'>
              <Image width={24} height={24} alt='Picture of the author' src='/static/zalo.svg' />
              <Image width={24} height={24} src='/static/whatsapp.svg' />
            </Box>

            <Typography variant='subtitle1'>{staffInfo.phoneNumber}</Typography>
          </Box>
        </Box>
        <Typography variant='body1'>
          {t('popup.contact.body3')}
          <Typography variant='h6' component='span'>
            {t('popup.contact.body4')}
          </Typography>
          {t('popup.contact.body5')}
        </Typography>
      </Box>
    </Popup>
  );
}

export default ContactPopup;
