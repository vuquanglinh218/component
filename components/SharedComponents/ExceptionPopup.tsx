import { Box, Typography, createStyles, makeStyles } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import ErrorIcon from 'components/icons/ErrorIcon';
import { useTranslation } from 'next-i18next';

interface ExceptionPopupProps extends PopupProps {}

function ExceptionPopup(props: ExceptionPopupProps) {
  const { ...otherProps } = props;
  const { t } = useTranslation('common');

  return (
    <Popup hiddenTitle hiddenAction disableBackdropClick={false} maxWidth='sm' {...otherProps}>
      <ErrorIcon />
      <Typography variant='subtitle2'>{t('popup.exception.paymentFailed')}</Typography>
      <Typography variant='body2' align='center'>
        {t('popup.exception.body1')}
        <br />
        {t('popup.exception.body2')}
      </Typography>
    </Popup>
  );
}

export default ExceptionPopup;
