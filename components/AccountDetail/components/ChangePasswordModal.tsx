import { ChangePasswordModalProps, TogglePassEndAdornment } from './AccountDetailPaper';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Hidden,
  Input,
  Modal,
  Paper,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { changePasswordStyle } from './ChangePassword.style';
import { NextClientService } from '../../../services/NextClientService';
import { AccountChangePasswordRequest, LoginIdentity } from '../../../services/Model';
import { BootstrapTooltip } from '../../Tooltip/Tooltip';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';
import NotificationContent from '../../Utils/NotificationContent';
import CloseIcon from '@material-ui/icons/Close';

function ChangePasswordModal(props: ChangePasswordModalProps) {
  const { classes, showModalChangePassword, hideFunc, phoneNumber, countryCode, email, loginIdentity } = props;
  const { register, getValues, handleSubmit } = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      repeat_new_password: '',
    },
  });

  const router = useRouter();
  const [showCurrPass, setShowCurrPass] = useState<boolean>(false);
  const [showRepeat, setShowRepeat] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [passErr, setPassErr] = useState<'false' | 'blank' | 'unauthenticated' | 'duplicated'>('false');
  const [newPassErr, setNewPassErr] = useState<'false' | 'blank' | 'wrong_format'>('false');
  const [repeatPassErr, setRepeatPassErr] = useState<'false' | 'blank' | 'not_equal'>('false');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    removeTooltipError();
    setShowCurrPass(false);
    setShowRepeat(false);
    setShowNewPass(false);
  }, [showModalChangePassword]);
  const removeTooltipError = () => {
    setPassErr('false');
    setNewPassErr('false');
    setRepeatPassErr('false');
  };
  const handleChangePass = () => {
    removeTooltipError();
    const { current_password } = getValues();
    if (current_password == '') {
      setPassErr('blank');
      return false;
    } else {
      setPassErr('false');
      return true;
    }
  };
  const handleChangeNewPass = (): boolean => {
    removeTooltipError();
    const { new_password } = getValues();
    if (new_password == '') {
      setNewPassErr('blank');
      return false;
    } else {
      let reg = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
      if (!reg.test(new_password)) {
        setNewPassErr('wrong_format');
        return false;
      } else {
        setNewPassErr('false');
        return true;
      }
    }
  };
  const handleChangeRepeatNewPass = (): boolean => {
    removeTooltipError();
    const { repeat_new_password, new_password } = getValues();
    if (repeat_new_password == '') {
      setRepeatPassErr('blank');
      return false;
    } else {
      if (repeat_new_password != new_password) {
        setRepeatPassErr('not_equal');
        return false;
      } else {
        setRepeatPassErr('false');
        return true;
      }
    }
  };
  const onUpdatePasswordFail = () => {
    enqueueSnackbar(<NotificationContent content={t('notification.updatePassword.fail')} variant={'error'} />, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
  };
  const onSubmit = () => {
    const { new_password, current_password, repeat_new_password } = getValues();
    const lang = i18n.language === 'th' ? 'th_TH' : i18n.language === 'en' ? 'en_US' : 'vi_VN';
    const req: { update_password: AccountChangePasswordRequest } = {
      update_password: {
        new_password: new_password,
        current_password: current_password,
        loginIdentity: loginIdentity,
        lang: lang,
      },
    };
    if (loginIdentity === LoginIdentity.PHONE_NUMBER) {
      req.update_password.country_code = countryCode;
      req.update_password.phone_number = phoneNumber;
    } else {
      req.update_password.email = email;
    }
    const trigger = async () => {
      setSubmitting(true);
      NextClientService.updatePassword(req)
        .then((result) => {
          setSubmitting(false);
          if (result.status == 200) {
            enqueueSnackbar(
              <NotificationContent content={t('notification.updatePassword.success')} variant={'success'} />,
              {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                autoHideDuration: 4000,
              },
            );
            hideFunc();
            setTimeout(() => router.reload(), 4000);
          }
        })
        .catch((reason) => {
          setSubmitting(false);
          if (reason.response?.status === 401) {
            onUpdatePasswordFail();
            router.push('/login');
            hideFunc();
            return;
          }
          if (reason.response?.status === 409) {
            onUpdatePasswordFail();
            router.push('/login');
            hideFunc();
            return;
          }
          if (reason.response?.data?.data_error?.errors?.error) {
            enqueueSnackbar(
              <NotificationContent content={reason.response.data.data_error.errors.error} variant={'error'} />,
              {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                autoHideDuration: 4000,
              },
            );
          } else {
            setPassErr('unauthenticated');
          }
        });
    };
    const validate = (callback: () => void) => {
      let reg = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
      if (!handleChangePass()) return;
      if (!handleChangeNewPass()) return;
      if (!handleChangeRepeatNewPass()) return;
      if (
        new_password != '' &&
        reg.test(new_password) &&
        repeat_new_password == new_password &&
        current_password != ''
      ) {
        callback();
      }
    };
    validate(trigger);
  };

  return (
    <Modal
      onEscapeKeyDown={hideFunc}
      className={classes.modal}
      open={showModalChangePassword}
      style={{ overflowX: 'hidden' }}
    >
      <Paper style={{ outline: 'none' }} className={classes.popupPaperChangePass} square={false}>
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction='column'>
            <Grid item className={classes.popUpGridChangePass}>
              <Typography className={classes.modalTypoTitle} style={{ fontWeight: 500 }} variant='h1'>
                {t('account.detail.changePassword.title')}
              </Typography>
              <Hidden smUp implementation='css'>
                <CloseIcon style={{ cursor: 'pointer', marginRight: 20 }} onClick={hideFunc} />
              </Hidden>
            </Grid>
            <Divider />
            <Grid container direction='column' className={classes.popUpGridChangePass} spacing={2}>
              <Grid item container direction='row' className={classes.gridUpdatePassword} spacing={2}>
                <Grid item xs={12} md={6} className={classes.flexBoxColumnSpaceBetween}>
                  <Typography className={classes.titleInputLabel} variant='inherit'>
                    {t('account.detail.changePassword.passwordAccountAuthenticated')}
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <BootstrapTooltip
                    disableHoverListener
                    placement='top'
                    title={
                      passErr == 'blank'
                        ? t('account.detail.changePassword.valid.passwordMustNotBeBlank')
                        : t('account.detail.changePassword.valid.passwordNotMatch')
                    }
                    open={passErr != 'false'}
                  >
                    <TextField
                      onChange={handleChangePass}
                      type={showCurrPass ? 'text' : 'password'}
                      inputRef={register}
                      name='current_password'
                      style={{ marginTop: '0.5rem' }}
                      fullWidth={true}
                      variant='outlined'
                      size='small'
                      placeholder={t('account.detail.changePassword.currentPassword')}
                      error={passErr != 'false'}
                      InputProps={{
                        className: classes.inputChangePassword,
                        endAdornment: (
                          <TogglePassEndAdornment
                            toggle={() => {
                              setShowCurrPass(!showCurrPass);
                            }}
                            show={showCurrPass}
                          />
                        ),
                      }}
                    />
                  </BootstrapTooltip>
                </Grid>
                {loginIdentity === LoginIdentity.PHONE_NUMBER ? (
                  <Grid item xs={12} md={6} className={classes.flexBoxColumnSpaceBetween}>
                    <Typography className={classes.titleInputLabel} variant='inherit'>
                      {t('account.detail.changePassword.phoneNumber')}
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Input
                      id='input-with-icon-adornment'
                      style={{
                        marginTop: '0.5rem',
                        fontWeight: 500,
                        border: '1px solid #D3D5D7',
                        padding: '18.5px 14px',
                        background: '#D3D5D7',
                        borderRadius: 3,
                      }}
                      fullWidth={true}
                      value={phoneNumber}
                      disableUnderline={true}
                      readOnly={true}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6} className={classes.flexBoxColumnSpaceBetween}>
                    <Typography className={classes.titleInputLabel} variant='inherit'>
                      {t('account.detail.info.email')}
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Input
                      id='input-with-icon-adornment'
                      style={{
                        marginTop: '0.5rem',
                        fontWeight: 500,
                        border: '1px solid #D3D5D7',
                        padding: '18.5px 14px',
                        background: '#D3D5D7',
                        borderRadius: 3,
                      }}
                      fullWidth={true}
                      value={email}
                      disableUnderline={true}
                      readOnly={true}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item container direction='row' className={classes.gridUpdatePassword} spacing={2}>
                <Grid item xs={12} md={6} className={classes.flexBoxColumnSpaceBetween}>
                  <Typography className={classes.titleInputLabel} variant='inherit'>
                    {t('account.detail.changePassword.newPassword')}
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <BootstrapTooltip
                    error={newPassErr != 'false'}
                    disableHoverListener
                    placement='top'
                    title={
                      newPassErr == 'blank'
                        ? t('account.detail.changePassword.valid.passwordMustNotBeBlank')
                        : t('account.detail.changePassword.valid.passwordInvalid')
                    }
                    open={newPassErr != 'false'}
                  >
                    <TextField
                      onChange={handleChangeNewPass}
                      type={showNewPass ? 'text' : 'password'}
                      inputRef={register}
                      name='new_password'
                      style={{ marginTop: '0.5rem' }}
                      fullWidth={true}
                      variant='outlined'
                      size='small'
                      placeholder={t('account.detail.changePassword.newPassword')}
                      InputProps={{
                        className: classes.inputChangePassword,
                        endAdornment: (
                          <TogglePassEndAdornment
                            toggle={() => {
                              setShowNewPass(!showNewPass);
                            }}
                            show={showNewPass}
                          />
                        ),
                      }}
                    />
                  </BootstrapTooltip>
                </Grid>
                <Grid item xs={12} md={6} className={classes.flexBoxColumnSpaceBetween}>
                  <Typography className={classes.titleInputLabel} variant='inherit'>
                    {t('account.detail.changePassword.retypeNewPassword')}
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <BootstrapTooltip
                    error={repeatPassErr != 'false'}
                    placement='top'
                    title={
                      repeatPassErr == 'blank'
                        ? t('account.detail.changePassword.valid.retypePasswordMustNotBeBlank')
                        : t('account.detail.changePassword.valid.retypePasswordInvalid')
                    }
                    disableHoverListener
                    open={repeatPassErr != 'false'}
                  >
                    <TextField
                      onChange={handleChangeRepeatNewPass}
                      type={showRepeat ? 'text' : 'password'}
                      inputRef={register}
                      name='repeat_new_password'
                      style={{ marginTop: '0.5rem' }}
                      fullWidth={true}
                      variant='outlined'
                      size='small'
                      placeholder={t('account.detail.changePassword.retypeNewPassword')}
                      InputProps={{
                        className: classes.inputChangePassword,
                        endAdornment: (
                          <TogglePassEndAdornment
                            toggle={() => {
                              setShowRepeat(!showRepeat);
                            }}
                            show={showRepeat}
                          />
                        ),
                      }}
                    />
                  </BootstrapTooltip>
                </Grid>
              </Grid>
              <Hidden smUp implementation='css'>
                <Grid item container direction='row' spacing={2}>
                  <Grid item xs={12} className={classes.flexBoxColumnSpaceBetween}>
                    <Button
                      style={{ width: 'calc(100% - 12px)', marginTop: '12px' }}
                      className={classes.buttonSubmitUpdate}
                      variant='contained'
                      disabled={isSubmitting}
                      color='primary'
                      type='submit'
                      onClick={handleSubmit(onSubmit)}
                    >
                      {isSubmitting ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : t('action.save')}
                    </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.flexBoxColumnSpaceBetween}>
                    <Button
                      style={{ width: 'calc(100% - 12px)', marginBottom: '12px' }}
                      className={classes.buttonCancelUpdate}
                      variant='outlined'
                      disabled={isSubmitting}
                      color='primary'
                      type='submit'
                      onClick={() => hideFunc()}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={20} color={'inherit'} thickness={4} />
                      ) : (
                        t('action.cancel')
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Hidden>
              <Grid item>
                <div className={classes.noteBoxPasswordBackGround}>
                  <div className={classes.noteBoxPassword}>
                    <Typography className={classes.passwordChangeNote} style={{ paddingTop: 0 }}>
                      <span style={{ color: 'red' }}>{t('account.detail.changePassword.note.title')} </span>
                      {t('account.detail.changePassword.note.passwordChangeNote1')}
                    </Typography>
                    <Typography className={classes.passwordChangeNote}>
                      {t('account.detail.changePassword.note.passwordChangeNote2')}
                    </Typography>
                    <Typography className={classes.passwordChangeNote}>
                      {t('account.detail.changePassword.note.passwordChangeNote3')}
                    </Typography>
                    <Typography className={classes.passwordChangeNote}>
                      {t('account.detail.changePassword.note.passwordChangeNote4')}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Hidden xsDown implementation='css'>
              <Grid item className={classes.popUpGridChangePass} style={{ justifyContent: 'flex-end' }}>
                <Button
                  className={classes.buttonCancelUpdate}
                  variant='outlined'
                  disabled={isSubmitting}
                  color='primary'
                  type='submit'
                  onClick={() => hideFunc()}
                >
                  {isSubmitting ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : t('action.cancel')}
                </Button>
                <Button
                  className={classes.buttonSubmitUpdate}
                  variant='contained'
                  disabled={isSubmitting}
                  color='primary'
                  type='submit'
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : t('action.save')}
                </Button>
              </Grid>
            </Hidden>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
}

export default withStyles(changePasswordStyle)(ChangePasswordModal);
