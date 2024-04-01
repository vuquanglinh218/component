import Success from 'components/icons/Success';
import Popup, { PopupProps } from './Popup';
import { Box, Link, Typography, createStyles, makeStyles } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

interface PaymentSuccessPopupProps extends PopupProps {
  onConfirm?: () => Promise<void> | void;
  email?: string;
  linkInfo?: string;
}

function PaymentSuccessPopup(props: PaymentSuccessPopupProps) {
  const { onConfirm, email = 'locnt@sapo.vn', linkInfo = '#', ...otherProps } = props;
  const { t } = useTranslation('common');

  return (
    <Popup hiddenTitle hiddenAction hiddenBtnClose maxWidth='sm' {...otherProps}>
      <Success />
      <Typography variant='subtitle2'>{t('popup.paymentSuccess.title')}</Typography>
      <Typography variant='body2' align='center'>
        {t('popup.paymentSuccess.body1')}
        <br />
        {t('popup.paymentSuccess.body2')}
        <br />
        {t('popup.paymentSuccess.body3')}
        <Typography variant='body2' color='primary' component='span'>
          {email}
        </Typography>
        <br /> {t('popup.paymentSuccess.body4')}
        <Link display='inline' href={linkInfo} onClick={onConfirm}>
          {t('popup.paymentSuccess.infoPackageService')}
        </Link>
      </Typography>
    </Popup>
  );
}

export default PaymentSuccessPopup;
