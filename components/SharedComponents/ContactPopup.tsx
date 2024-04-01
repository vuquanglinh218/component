import { Box, Typography } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import ContactIcon from 'components/icons/ContactIcon';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { GetUserWithDomain } from 'services/Model';
import { TagType } from './Tag';

interface ContactPopupProps extends PopupProps {
  staffInfo?: GetUserWithDomain;
  tag: TagType | false;
}

function ContactPopup(props: ContactPopupProps) {
  const { staffInfo, tag, ...otherProps } = props;
  const { t } = useTranslation('common');

  const handleRenderInfoStaff = (info: GetUserWithDomain, tag: TagType | false) => {
    if (staffInfo) {
      const isCSKH = info.user_name === 'CSKH';

      switch (tag) {
        case false:
        case TagType.expired:
          return {
            userName: info.user_name,
            zaloLink: info.user_zalo_link,
            phoneNumber: info.user_phone,
            isCSKH,
          };
        case TagType.aboutToExpire:
        case TagType.expires30Days:
          return {
            userName: info.renewal_sale_name,
            zaloLink: info.renewal_sale_zalo_link,
            phoneNumber: info.renewal_sale_phone,
            isCSKH,
          };
        default:
          return {
            userName: info.user_name,
            zaloLink: info.user_zalo_link,
            phoneNumber: info.user_phone,
            isCSKH,
          };
      }
    }
  };

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
              {handleRenderInfoStaff(staffInfo, tag)?.userName}
            </Typography>
          </Typography>
          <Box display='flex' alignItems='center'>
            <Box display='flex' alignItems='center'>
              <Image width={24} height={24} alt='Picture of the author' src='/static/zalo.svg' />
              <Image width={24} height={24} src='/static/whatsapp.svg' />
            </Box>

            <Typography variant='subtitle1'>{handleRenderInfoStaff(staffInfo, tag)?.phoneNumber}</Typography>
          </Box>
        </Box>
        {!handleRenderInfoStaff(staffInfo, tag)?.isCSKH && (
          <Typography variant='body1'>
            {t('popup.contact.body3')}
            <Typography variant='h6' component='span'>
              {t('popup.contact.body4')}
            </Typography>
            {t('popup.contact.body5')}
          </Typography>
        )}
      </Box>
    </Popup>
  );
}

export default ContactPopup;
