import React, { Fragment, useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  Hidden,
  Paper,
  TextField,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ChangePasswordModal from './components/ChangePasswordModal';
import accountDetailStyles from './components/AccountDetailPaper.styles';
import { LoginIdentity, UpdateProfileRequest, User } from '../../services/Model';
import DateTimePicker from '../Utils/DateTimePicker';
import DateTimeIcon from '../Utils/DateTimePicker/DateTimeIcon';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import AddressDetail from './components/AddressDetail';
import { NextClientService } from '../../services/NextClientService';
import { useRouter } from 'next/router';
import LazyLoadingSelect from './components/CustomSelect';
import { i18n, useTranslation } from 'next-i18next';
import NotificationContent from '../Utils/NotificationContent';
import Link from '@material-ui/core/Link';

export interface AccountDetailProps extends WithStyles<any> {
  user: User;
}
type OptionSelection = {
  value: any;
  label: string;
  disabled: boolean;
};

function Detail(props: AccountDetailProps & { userName: string; setUsername: any }) {
  const { classes, user, userName, setUsername } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [showModalChangePassword, setShowModalChangePassword] = useState<boolean>(false);
  const [isUpdating, setUpdating] = useState<boolean>(false);
  const [enableUpdateLanguage, setEnableUpdateLanguage] = useState<boolean>(false);
  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )enable-update-lang=([^;]+)'));
    if (match && match[2] && match[2] === 'true') {
      setEnableUpdateLanguage(true);
    }
  }, []);
  const [errors, setErrors] = useState<string[]>([]);
  const { t } = useTranslation('common');
  const genderOptions: OptionSelection[] = [
    {
      label: t('account.detail.info.genderOptions.other'),
      value: 'other',
      disabled: false,
    },
    {
      label: t('account.detail.info.genderOptions.female'),
      value: 'female',
      disabled: false,
    },
    {
      label: t('account.detail.info.genderOptions.male'),
      value: 'male',
      disabled: false,
    },
  ];
  const languageOptions: OptionSelection[] = [
    {
      label: t('account.detail.info.languageOptions.vi'),
      value: 'vi',
      disabled: false,
    },
    {
      label: t('account.detail.info.languageOptions.en'),
      value: 'en',
      disabled: false,
    },
    {
      label: t('account.detail.info.languageOptions.th'),
      value: 'th',
      disabled: false,
    },
  ];
  const [initValue, setInitValue] = useState<any>({
    full_name: user.full_name ?? '',
    phone_number: user.phone_number ?? '',
    email: user.email ?? '',
    gender: user.gender ?? 'other',
    language: user.language,
    d_dob: user.dob ? new Date(user.dob) : null,
    ward: user.ward_id || null,
    city_district: user.city_id ? user.city_id + '_' + user.district_id : null,
    address: user.address ?? '',
  });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const beforeRouteHandler = (url: string) => {
      if (isUpdating && router.pathname !== url && !window.confirm(t('notification.leavePage'))) {
        router.events.emit('routeChangeError');
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored).`;
      }
      setSubmitting(true);
    };
    // @ts-ignore
    window.removeEventListener('beforeunload', beforeRouteHandler);
    router.events.on('routeChangeStart', beforeRouteHandler);
    return () => {
      // @ts-ignore
      window.removeEventListener('beforeunload', beforeRouteHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
      return false;
    };
  }, [isUpdating]);
  const router = useRouter();
  useEffect(() => {
    setUpdating(isUpdate);
  }, [initValue]);
  const { control, register, setValue, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      ...initValue,
    },
    mode: 'onChange',
  });
  const cancelUpdateForm = () => {
    for (let prop in initValue) {
      // @ts-ignore
      setValue(prop, initValue[prop]);
    }
    setUpdating(isUpdate);
    setErrors([]);
  };
  let isUpdate = () => {
    return propertiesUpdate().length > 0;
  };
  let propertiesUpdate = (): string[] => {
    const result: string[] = [];
    for (let iVal in initValue) {
      if (iVal === 'language' && !enableUpdateLanguage) continue;
      if (initValue[iVal] instanceof Date) {
        if (formatDate(initValue[iVal]) !== formatDate(getValues()[iVal])) result.push(iVal);
      } else if (initValue[iVal] !== getValues()[iVal]) result.push(iVal);
    }
    return result;
  };
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const onSubmit = (data) => {
    const error = [];
    if (propertiesUpdate().includes('full_name')) {
      if (data.full_name.length === 0) {
        errorNotification(t('account.detail.valid.fullNameMustNotBeNull'));
        error.push('full_name');
        setErrors(error);
        return;
      }
    }
    if (propertiesUpdate().includes('full_name')) {
      if (data.full_name.length > 250) {
        errorNotification(t('account.detail.valid.fullNameOverLength'));
        error.push('full_name');
        setErrors(error);
        return;
      }
    }
    if (propertiesUpdate().includes('email')) {
      if (data.email.length === 0) {
        errorNotification(t('account.detail.valid.emailMusNotBeEmpty'));
        error.push('email');
        setErrors(error);
        return;
      }
      if (!regexMail.test(data.email)) {
        errorNotification(t('account.detail.valid.emailInvalid'));
        error.push('email');
        setErrors(error);
        return;
      }
    }
    if (propertiesUpdate().includes('phone_number')) {
      if (data.phone_number.length === 0) {
        errorNotification(t('account.detail.valid.phoneNumberMusNotBeEmpty'));
        error.push('phone_number');
        setErrors(error);
        return;
      }
      if (!/^0/.test(data.phone_number)) {
        errorNotification(t('account.detail.valid.phoneNumberStartWithZero'));
        error.push('phone_number');
        setErrors(error);
        return;
      }
      if (data.phone_number.length < 8 || data.phone_number.length > 25) {
        errorNotification(t('account.detail.valid.phoneNumberDigits'));
        error.push('phone_number');
        setErrors(error);
        return;
      }
    }

    if (propertiesUpdate().includes('address')) {
      if (data.address.length > 250) {
        errorNotification(t('account.detail.valid.addressOverLength'));
        error.push('address');
        setErrors(error);
        return;
      }
    }
    const request: UpdateProfileRequest = new UpdateProfileRequest();
    request.full_name = data.full_name;
    if (user.login_identity === LoginIdentity.PHONE_NUMBER) {
      request.email = data.email?.length ? data.email : null;
      request.phone_number = user.phone_number;
    } else {
      request.phone_number = data.phone_number?.length ? data.phone_number : null;
      request.email = user.email;
    }
    request.gender = data.gender;
    // mapping properties
    if (data.city_district) {
      const cityDistrict = data.city_district.split('_');
      request.city_id = parseInt(cityDistrict[0], 10);
      request.district_id = parseInt(cityDistrict[1], 10);
    } else {
      request.city_id = null;
      request.district_id = null;
    }
    if (data.ward) {
      request.ward_id = parseInt(data.ward, 10);
    } else {
      request.ward_id = null;
    }
    if (data.d_dob) {
      request.dob = new Date(data.d_dob).toISOString();
    } else request.dob = null;
    request.address = data.address;
    if (enableUpdateLanguage) request.language = data.language;
    setSubmitting(true);
    NextClientService.updateProfile({ account: request })
      .then((res) => {
        if (res.data.success) {
          updateInformationSuccess();
          if (enableUpdateLanguage && user.language !== request.language) {
            setTimeout(() => {
              i18n.changeLanguage(request.language).then((r) => {
                let date = new Date();
                date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
                const expires = '; expires=' + date.toISOString();
                document.cookie = 'lang=' + request.language + expires + '; domain=sapogo.com; path=/';
                router.reload();
              });
            }, 3000);
          }
          return;
        }
        errorNotification(t('notification.updateInformation.fail'));
        router.push('/login');
      })
      .catch((reason) => {
        errorNotification(t('notification.updateInformation.fail'));
        if (reason.response?.status === 401) {
          router.push('/login');
          return;
        }
        setSubmitting(false);
      });
  };
  const updateInformationSuccess = () => {
    for (let prop in initValue) {
      setInitValue(getValues());
    }
    setUsername(getValues('full_name'));
    setSubmitting(false);
    enqueueSnackbar(<NotificationContent content={t('notification.updateInformation.success')} variant={'success'} />, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
  };
  const errorNotification = (message) => {
    enqueueSnackbar(<NotificationContent content={message} variant={'error'} />, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
  };

  const openModalChangePass = () => {
    setShowModalChangePassword(true);
  };
  const hideModalChangePass = () => {
    setShowModalChangePassword(false);
  };
  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  function handleChangePhoneNumber(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/^[^0-9]+$/.test(keyValue)) event.preventDefault();
    else if (event.target.value.length > 25) event.preventDefault();
  }

  return (
    <Paper variant='outlined' className={classes.detailPaper} style={{ marginRight: '26px' }}>
      {isUpdating ? (
        <AppBar className={classes.appBarUpdate}>
          <Toolbar className={classes.buttonAppBarUpdate}>
            <Button
              className={classes.buttonCancelUpdate}
              variant='outlined'
              disabled={isSubmitting}
              color='primary'
              type='submit'
              onClick={cancelUpdateForm}
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
          </Toolbar>
        </AppBar>
      ) : (
        ''
      )}

      <form style={isSubmitting ? { pointerEvents: 'none' } : {}} onSubmit={(event) => event.preventDefault()}>
        <Grid container direction='column' className={classes.popUpGridChangePass} spacing={2}>
          <Grid item container direction='row' spacing={2}>
            <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
              <Typography className={classes.titleInput} variant='inherit'>
                {t('account.detail.info.fullName')}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                type={'text'}
                name='full_name'
                error={errors.includes('full_name')}
                inputRef={register}
                onFocus={() => {
                  if (errors.includes('full_name')) setErrors([]);
                }}
                onChange={() => setUpdating(isUpdate)}
                style={{ marginTop: '0.5rem' }}
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
              <Typography className={classes.titleInput} variant='inherit'>
                {t('account.detail.info.phoneNumber')}{' '}
              </Typography>
              <TextField
                type={'text'}
                name='phone_number'
                inputRef={register}
                typeof={'number'}
                error={errors.includes('phone_number')}
                onFocus={() => {
                  if (errors.includes('phone_number')) setErrors([]);
                }}
                onKeyPress={handleChangePhoneNumber}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (!(e.target.value === '' || re.test(e.target.value))) {
                    setValue('phone_number', e.target.value.replace(/[^0-9]/g, ''));
                  }
                  if (e.target.value.length > 25) {
                    setValue('phone_number', e.target.value.substr(0, 25));
                  }
                  setUpdating(isUpdate);
                }}
                inputProps={{ pattern: '[0-9]{1,25}' }}
                style={{ marginTop: '0.5rem' }}
                fullWidth={true}
                disabled={user.login_identity !== LoginIdentity.EMAIL}
                variant='outlined'
                size='small'
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
              <Typography className={classes.titleInput} variant='inherit'>
                {t('account.detail.info.email')}
              </Typography>
              <TextField
                type={'text'}
                name='email'
                inputRef={register}
                error={errors.includes('email')}
                onFocus={() => {
                  if (errors.includes('email')) setErrors([]);
                }}
                onChange={() => setUpdating(isUpdate)}
                style={{ marginTop: '0.5rem', fontWeight: 500 }}
                fullWidth={true}
                disabled={user.login_identity === LoginIdentity.EMAIL}
                variant='outlined'
                size='small'
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
              <Typography className={classes.titleInput} variant='inherit'>
                {t('account.detail.info.dob')}
              </Typography>
              <Controller
                name={'d_dob'}
                id={'dob-input'}
                control={control}
                defaultValue={getValues('d_dob')}
                render={({ onChange, value }) => (
                  <Fragment>
                    <Hidden xsDown implementation='css'>
                      <DateTimePicker
                        autoOk
                        variant='inline'
                        inputVariant='outlined'
                        format='dd/MM/yyyy'
                        openTo={'date'}
                        value={value}
                        style={{ marginTop: '0.5rem', width: '100%' }}
                        onChange={(date) => {
                          onChange(date);
                          setUpdating(isUpdate);
                        }}
                        invalidDateMessage=''
                        keyboardIcon={<DateTimeIcon />}
                      />
                    </Hidden>
                    <Hidden smUp implementation='css'>
                      <DateTimePicker
                        autoOk
                        variant='inline'
                        inputVariant='outlined'
                        format='dd/MM/yyyy'
                        disableToolbar
                        openTo={'year'}
                        views={['year', 'month', 'date']}
                        value={value}
                        style={{ marginTop: '0.5rem', width: '100%' }}
                        onChange={(date) => {
                          onChange(date);
                          setUpdating(isUpdate);
                        }}
                        invalidDateMessage=''
                        keyboardIcon={<DateTimeIcon />}
                      />
                    </Hidden>
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
              <Typography className={classes.titleInput} variant='inherit'>
                {t('account.detail.info.gender')}
              </Typography>
              <Controller
                name={'gender'}
                id={'gender-input'}
                control={control}
                defaultValue={getValues('gender')}
                render={({ onChange, value }) => (
                  <LazyLoadingSelect
                    options={genderOptions}
                    value={value}
                    setValue={(valueUpdate) => {
                      onChange(valueUpdate.value);
                      setUpdating(isUpdate);
                    }}
                    style={{ marginTop: '0.5rem', height: '40px' }}
                    clearable={false}
                    placeholder={t('account.detail.info.genderOptions.other')}
                    noResultsText={''}
                  />
                )}
              />
            </Grid>
            {enableUpdateLanguage && (
              <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
                <Typography className={classes.titleInput} variant='inherit'>
                  {t('account.detail.info.language')}
                </Typography>
                <Controller
                  name={'language'}
                  id={'language-input'}
                  control={control}
                  defaultValue={getValues('language')}
                  render={({ onChange, value }) => (
                    <LazyLoadingSelect
                      options={languageOptions}
                      value={value}
                      setValue={(valueUpdate) => {
                        onChange(valueUpdate.value);
                        setUpdating(isUpdate);
                      }}
                      style={{ marginTop: '0.5rem', height: '40px' }}
                      clearable={false}
                      noResultsText={''}
                      placeholder={''}
                    />
                  )}
                />
              </Grid>
            )}

            <AddressDetail
              classes={classes}
              user={user}
              getValueHookForm={getValues}
              control={control}
              setValueHookForm={setValue}
              isUpdate={isUpdate}
              register={register}
              setUpdating={setUpdating}
            />
            <Grid item xs={12} style={{ alignItems: 'flex-start' }} className={classes.flexBoxColumnSpaceBetween}>
              <Link
                style={{
                  textTransform: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: 5,
                  paddingTop: 10,
                  fontWeight: 500,
                }}
                onClick={openModalChangePass}
                href={'#'}
              >
                {t('account.detail.changePassword.title')}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <ChangePasswordModal
        hideFunc={hideModalChangePass}
        phoneNumber={getValues('phone_number')}
        loginIdentity={user.login_identity}
        countryCode={user.country_code}
        email={getValues('email')}
        showModalChangePassword={showModalChangePassword}
      />
    </Paper>
  );
}

export default withStyles(accountDetailStyles)(Detail);
