import { useTranslation } from 'next-i18next';
import Popup, { PopupProps } from './Popup';
import { Box, Button, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

interface CancelPaymentPopupProps extends PopupProps {
  onConfirm?: () => Promise<void> | void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContentRoot: {
      minWidth: 500,
      border: '0px',
      padding: '12px 16px',
    },

    buttonOutlined: {
      borderColor: theme.palette.grey[400],
      color: 'black',
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
        color: 'black',
      },
    },
  }),
);

function CancelPaymentPopup(props: CancelPaymentPopupProps) {
  const { onConfirm, onClose, ...otherProps } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');

  const Action = (
    <Box display='flex' gridGap={12}>
      <Button classes={{ outlined: classes.buttonOutlined }} variant='outlined' onClick={onClose}>
        {t('popup.cancelPayment.close')}
      </Button>
      <Button color='secondary' variant='contained' onClick={onConfirm}>
        {t('popup.cancelPayment.confirmCancel')}
      </Button>
    </Box>
  );

  return (
    <Popup
      title={t('popup.cancelPayment.cancelPayment')}
      actionElement={Action}
      dialogContentProps={{ classes: { root: classes.dialogContentRoot } }}
      onClose={onClose}
      {...otherProps}
    >
      {t('popup.cancelPayment.message')}
    </Popup>
  );
}

export default CancelPaymentPopup;
