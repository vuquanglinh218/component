import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import { Grid, InputAdornment, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import updateProfileStyles from '../../components/Common/mobile/UpdateProfile';
import MobileLayout from '../../components/layouts/MobileLayout';
import { AccountChangePasswordRequest, LoginIdentity, User } from '../../services/Model';
import React, { useState } from 'react';
import getConfig from 'next/config';
import ErrorNoteIcon from '../../components/icons/mobile/ErrorNoteIcon';
import { useTranslation } from 'next-i18next';
import { TogglePassEndAdornment } from '../../components/AccountDetail/components/AccountDetailPaper';
import { BootstrapTooltip } from '../../components/Tooltip/Tooltip';
import NotificationContent from '../../components/Utils/NotificationContent';
import { NextClientService } from '../../services/NextClientService';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

interface MobileConnectSocialProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
}
type Provider = 'Google' | 'Facebook' | 'Apple';
const {
  publicRuntimeConfig: { baseUrl, sapoAccountsBaseUrl, facebookId },
} = getConfig();
function MobileChagePassword(
  props: MobileConnectSocialProps & InferWithAuthServerSideProps<typeof getServerSideProps>,
) {
  const { classes, user } = props;
  const { t, i18n } = useTranslation('common');
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
  const [newPassErr, setNewPassErr] = useState<'false' | 'blank' | 'wrong_format' | 'error'>('false');
  const [repeatPassErr, setRepeatPassErr] = useState<'false' | 'blank' | 'not_equal'>('false');
  const { enqueueSnackbar } = useSnackbar();
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
        loginIdentity: user.login_identity,
        lang: lang,
      },
    };
    if (user.login_identity === LoginIdentity.PHONE_NUMBER) {
      req.update_password.country_code = user.country_code;
      req.update_password.phone_number = user.phone_number;
    } else {
      req.update_password.email = user.email;
    }
    const trigger = async () => {
      NextClientService.updatePassword(req)
        .then((result) => {
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
            router.push('/m');
            setTimeout(() => router.reload(), 4000);
          }
        })
        .catch((reason) => {
          if (reason.response?.status === 401) {
            onUpdatePasswordFail();
            router.push('/m');
            return;
          }
          if (reason.response?.status === 409) {
            onUpdatePasswordFail();
            router.push('/m');
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
            if (
              reason.response.data.data_error.errors.error === t('account.detail.changePassword.error.newPasswordExist')
            ) {
              setNewPassErr('error');
              return;
            }
          }
          setPassErr('unauthenticated');
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
  const action = () => {
    return onSubmit;
  };
  return (
    <MobileLayout
      title={t('account.detail.changePassword.title')}
      propParent={{ style: { backgroundColor: '#ffffff', paddingTop: '24px' } }}
      leftArea={{}}
      rightArea={{ action }}
    >
      <div style={{ paddingTop: 16 }}>
        <Grid item sm={12} className={classes.flexBoxColumnSpaceBetween}>
          <BootstrapTooltip
            disableHoverListener
            placement='top'
            title={
              passErr == 'blank'
                ? t('account.detail.changePassword.valid.passwordMustNotBeBlank')
                : t('account.detail.changePassword.valid.passwordNotMatch')
            }
            open={passErr !== 'false' && passErr !== 'unauthenticated'}
          >
            <TextField
              onChange={handleChangePass}
              type={showCurrPass ? 'text' : 'password'}
              inputRef={register}
              name='current_password'
              label={t('account.detail.changePassword.currentPassword')}
              style={{ marginTop: '0.5rem' }}
              fullWidth={true}
              size='small'
              error={passErr != 'false'}
              InputProps={{
                className: classes.inputChangePassword,
                endAdornment: (
                  <TogglePassEndAdornment
                    width={24}
                    height={24}
                    fontSize={'small'}
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
        <Grid item sm={12} className={classes.flexBoxColumnSpaceBetween}>
          <BootstrapTooltip
            error={newPassErr != 'false'}
            disableHoverListener
            placement='top'
            title={
              newPassErr == 'blank'
                ? t('account.detail.changePassword.valid.passwordMustNotBeBlank')
                : t('account.detail.changePassword.valid.passwordInvalid')
            }
            open={!['false', 'error'].includes(newPassErr)}
          >
            <TextField
              onChange={handleChangeNewPass}
              type={showNewPass ? 'text' : 'password'}
              inputRef={register}
              label={t('account.detail.changePassword.newPassword')}
              name='new_password'
              style={{ marginTop: '0.5rem' }}
              fullWidth={true}
              size='small'
              InputProps={{
                className: classes.inputChangePassword,
                endAdornment: (
                  <TogglePassEndAdornment
                    width={24}
                    height={24}
                    fontSize={'small'}
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
        <Grid item sm={12} className={classes.flexBoxColumnSpaceBetween}>
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
              label={t('account.detail.changePassword.retypeNewPassword')}
              name='repeat_new_password'
              style={{ marginTop: '0.5rem' }}
              fullWidth={true}
              size='small'
              InputProps={{
                className: classes.inputChangePassword,
                endAdornment: (
                  <TogglePassEndAdornment
                    width={24}
                    height={24}
                    fontSize={'small'}
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
      </div>
      <Grid
        item
        style={{ backgroundColor: '#fafafa', marginRight: '-24px', marginLeft: '-24px', padding: '12px  24px' }}
      >
        <div style={{ display: 'flex' }}>
          <ErrorNoteIcon />{' '}
          <Typography style={{ fontSize: 16, color: '#343741', fontWeight: 500, paddingLeft: '8px' }}>
            {t('account.detail.changePassword.note.title')}
          </Typography>
        </div>
        <Typography className={classes.passwordChangeNote}>
          {t('account.detail.changePassword.note.passwordChangeNote2')}
        </Typography>
        <Typography className={classes.passwordChangeNote}>
          {t('account.detail.changePassword.note.passwordChangeNote3')}
        </Typography>
        <Typography className={classes.passwordChangeNote}>
          {t('account.detail.changePassword.note.passwordChangeNote4')}
        </Typography>
      </Grid>
    </MobileLayout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(updateProfileStyles)(MobileChagePassword);
