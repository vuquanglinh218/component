import { Button, Checkbox, DialogContentText, makeStyles, Box, FormControlLabel } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import { UIEventHandler, useState } from 'react';

interface TermsOfUsePopupProps extends PopupProps {
  onConfirm?: () => Promise<void> | void;
}

const useStyles = makeStyles({
  paper: {
    maxHeight: 'calc(100% - 300px)',
  },
});

function TermsOfUsePopup(props: TermsOfUsePopupProps) {
  const { onConfirm, ...otherProps } = props;
  const [isAgreeToTerms, setIsAgreeToTerms] = useState<boolean>(false);
  const [haveReadTerms, setHaveReadTerms] = useState<boolean>(false);
  const classes = useStyles();

  const handleCheckTerms = () => {
    setIsAgreeToTerms(!isAgreeToTerms);
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as EventTarget & { scrollHeight: number; scrollTop: number; clientHeight: number };
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setHaveReadTerms(true);
    }
  };

  const DialogAction = (
    <Box display={'flex'} flexDirection='column' flex={1} alignItems='flex-end' paddingX='12px' paddingBottom='12px'>
      <Box marginRight='auto' width={'100%'} display='flex' alignItems='center'>
        <FormControlLabel
          control={<Checkbox checked={isAgreeToTerms} onChange={handleCheckTerms} size='small' color='primary' />}
          label='Tôi đồng ý với điều khoản sử dụng & thông tin bảo mật của Sapo'
          disabled={!haveReadTerms}
        />
      </Box>
      <Button variant='contained' onClick={onConfirm} disabled={!isAgreeToTerms}>
        Xác nhận và thanh toán
      </Button>
    </Box>
  );

  return (
    <Popup
      maxWidth='md'
      title='Điều khoản & sử dụng thanh toán'
      actionElement={DialogAction}
      className={classes.paper}
      dialogContentProps={{
        onScroll: handleScroll,
      }}
      classes={{ paper: classes.paper }}
      {...otherProps}
    >
      <DialogContentText tabIndex={-1}>
        {[...new Array(50)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}
      </DialogContentText>
    </Popup>
  );
}

export default TermsOfUsePopup;
