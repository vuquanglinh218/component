import { LoginIdentity, UpdateProfileRequest, User } from '../../services/Model';
import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import {
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import MobileLayout from '../../components/layouts/MobileLayout';
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from '../../components/Utils/DateTimePicker';
import DateTimeIcon from '../../components/Utils/DateTimePicker/DateTimeIcon';
import { useTranslation } from 'next-i18next';
import updateProfileStyles from '../../components/Common/mobile/UpdateProfile';
import classNames from 'classnames';
import { NextClientService } from '../../services/NextClientService';
import SelectionModal from '../../components/SelectionModal';
import RightThanIcon from '../../components/icons/mobile/RightThanIcon';
import NotificationContent from '../../components/Utils/NotificationContent';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import clsx from 'clsx';
export interface MobileUpdateProfileProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
}
type OptionSelection = {
  value: any;
  label: string;
  disabled: boolean;
};
function MobileUpdateProfile(
  props: MobileUpdateProfileProps & InferWithAuthServerSideProps<typeof getServerSideProps>,
) {
  const { classes, user } = props;
  const { t } = useTranslation('common');
  const [isShownPopupArea, setShownPopupArea] = useState<boolean>(false);
  const [isShownPopupWard, setShownPopupWard] = useState<boolean>(false);

  const [initValue] = useState<any>({
    full_name: user.full_name ?? '',
    phone_number: user.phone_number ?? '',
    email: user.email ?? '',
    gender: user.gender ?? 'other',
    d_dob: user.dob ? new Date(user.dob) : null,
    ward: user.ward_id ? user.ward_id : null,
    city_district: user.city_id ? user.city_id + '_' + user.district_id : null,
    address: user.address ?? '',
  });
  const { control, register, setValue, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      ...initValue,
    },
    mode: 'onChange',
  });
  let isUpdate = () => {
    return propertiesUpdate().length > 0;
  };
  let propertiesUpdate = (): string[] => {
    const result: string[] = [];
    for (let iVal in initValue) {
      if (initValue[iVal] instanceof Date) {
        if (formatDate(initValue[iVal]) !== formatDate(getValues()[iVal])) result.push(iVal);
      } else if (initValue[iVal] !== getValues()[iVal]) result.push(iVal);
    }
    return result;
  };
  function handleChangePhoneNumber(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/^[^0-9]+$/.test(keyValue)) event.preventDefault();
    else if (event.target.value.length > 25) event.preventDefault();
  }
  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }
  const [errors, setErrors] = useState<string[]>([]);
  const [cityDistricts, setCityDistricts] = useState<OptionSelection[]>([]);
  const [wards, setWards] = useState<OptionSelection[]>([]);
  useEffect(() => {
    NextClientService.getSapoCityDistricts(user.country_id).then((res) => {
      setCityDistricts(
        res.data.city_districts.map((cityDistrict) => {
          return { value: cityDistrict.id, label: cityDistrict.name, disabled: false, data: cityDistrict };
        }),
      );
    });
  }, []);

  useEffect(() => {
    const cityDistrict = getValues('city_district');
    if (cityDistrict) {
      const cityId = cityDistrict.split('_')[0];
      const districtId = cityDistrict.split('_')[1];
      updateWardByCityAndDistrict(cityId, districtId);
    }
  }, [getValues('ward')]);

  const updateWardByCityAndDistrict = (cityId: number, districtId: number) => {
    NextClientService.getSapoWard(user.country_id, cityId, districtId).then((wardRes) => {
      setWards(
        wardRes.data.wards.map((ward) => {
          return { value: ward.id, label: ward.name, disabled: false, data: ward };
        }),
      );
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  const updateInformationSuccess = () => {
    enqueueSnackbar(<NotificationContent content={t('notification.updateInformation.success')} variant={'success'} />, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
    router.push('/m', undefined, {
      shallow: true,
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
  const router = useRouter();
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
    NextClientService.updateProfile({ account: request })
      .then((res) => {
        if (res.data.success) {
          updateInformationSuccess();
          return;
        }
        errorNotification(t('notification.updateInformation.fail'));
      })
      .catch((reason) => {
        errorNotification(t('notification.updateInformation.fail'));
        if (reason.response?.status === 401) {
          return;
        }
      });
  };

  const onSave = () => {
    return function () {
      if (isUpdate()) onSubmit(getValues());
      else router.push('/m');
      return;
    };
  };
  return (
    <MobileLayout
      propParent={{ style: { backgroundColor: '#F6F7FB', padding: '46px 0', height: '100vh' } }}
      title={t('account.detail.info.update')}
      leftArea={{}}
      rightArea={{ action: onSave }}
    >
      <form onSubmit={(event) => event.preventDefault()} style={{ backgroundColor: '#ffffff', padding: '0 16px' }}>
        <Grid container direction='column' className={classes.content} spacing={2}>
          <Grid item sm={12} className={classes.flexBoxColumnSpaceBetween}>
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
              InputProps={{ className: clsx(classes.fontSize16, classes.fontWeightNormal) }}
              fullWidth={true}
              variant='standard'
              size='small'
            />
          </Grid>
          <Grid
            item
            sm={12}
            className={
              user.login_identity !== LoginIdentity.EMAIL
                ? classNames(classes.flexBoxColumnSpaceBetween, classes.disabled)
                : classes.flexBoxColumnSpaceBetween
            }
          >
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
              }}
              inputProps={{ pattern: '[0-9]{1,25}' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start' className={clsx(classes.fontSize16, classes.fontWeightNormal)}>
                    (+{user.country_code})
                  </InputAdornment>
                ),
                className: clsx(classes.fontSize16, classes.fontWeightNormal),
              }}
              fullWidth={true}
              disabled={user.login_identity !== LoginIdentity.EMAIL}
              variant='standard'
              size='small'
            />
          </Grid>
          <Grid
            item
            sm={12}
            className={
              user.login_identity === LoginIdentity.EMAIL
                ? classNames(classes.flexBoxColumnSpaceBetween, classes.disabled)
                : classes.flexBoxColumnSpaceBetween
            }
          >
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
              fullWidth={true}
              InputProps={{ className: clsx(classes.fontSize16, classes.fontWeightNormal) }}
              disabled={user.login_identity === LoginIdentity.EMAIL}
              variant='standard'
              size='small'
            />
          </Grid>
          <Grid item className={classes.flexBoxColumnSpaceBetween}>
            <Typography className={classes.titleInput} variant='inherit'>
              {t('account.detail.info.area')}
            </Typography>
            <Controller
              name={'city_district'}
              id={'city_district-input'}
              control={control}
              render={({ onChange, value }) => (
                <Button
                  className={classes.actionView}
                  variant='contained'
                  type='submit'
                  onClick={() => setShownPopupArea(true)}
                >
                  <div style={{ width: '93%' }} className={clsx(classes.fontSize16, classes.fontWeightNormal)}>
                    {' '}
                    {cityDistricts.find((cd) => cd.value === value)?.label}
                  </div>

                  <div className={classes.actionLink}>
                    <RightThanIcon />
                  </div>
                </Button>
              )}
            />
          </Grid>
          <Grid item className={classes.flexBoxColumnSpaceBetween}>
            <Typography className={classes.titleInput} variant='inherit'>
              {t('account.detail.info.ward')}
            </Typography>
            <Controller
              name={'ward'}
              id={'ward-input'}
              control={control}
              render={({ onChange, value }) => (
                <Button
                  className={classes.actionView}
                  variant='contained'
                  type='submit'
                  onClick={() => (getValues('city_district') ? setShownPopupWard(true) : {})}
                >
                  <div style={{ width: '93%' }} className={clsx(classes.fontSize16, classes.fontWeightNormal)}>
                    {' '}
                    {wards.find((w) => w.value === parseInt(value))?.label}
                  </div>

                  <div className={classes.actionLink}>
                    <RightThanIcon />
                  </div>
                </Button>
              )}
            />
          </Grid>
          <Grid item className={classes.flexBoxColumnSpaceBetween}>
            <Typography className={classes.titleInput} variant='inherit'>
              {t('account.detail.info.addressDetail')}
            </Typography>
            <TextField
              type={'text'}
              name={'address'}
              defaultValue={getValues('address')}
              inputRef={register}
              InputProps={{ className: clsx(classes.fontSize16, classes.fontWeightNormal) }}
              fullWidth={true}
              variant='standard'
              size='small'
            />
          </Grid>
          <Grid item sm={12} className={classes.flexBoxColumnSpaceBetween}>
            <Typography className={classes.titleInput} variant='inherit'>
              {t('account.detail.info.dob')}
            </Typography>
            <Controller
              name={'d_dob'}
              id={'dob-input'}
              control={control}
              defaultValue={getValues('d_dob')}
              render={({ onChange, value }) => (
                <DateTimePicker
                  autoOk
                  variant='inline'
                  inputVariant='standard'
                  format='dd/MM/yyyy'
                  disableToolbar
                  openTo={'year'}
                  views={['year', 'month', 'date']}
                  value={value}
                  className={classes.dobInput}
                  onChange={onChange}
                  invalidDateMessage=''
                  keyboardIcon={<DateTimeIcon style={{ width: 16, height: 16 }} />}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} className={clsx(classes.flexBoxColumnSpaceBetweenGender, classes.autoWHSvg)}>
            <Controller
              name={'gender'}
              id={'gender-input'}
              control={control}
              defaultValue={getValues('gender')}
              render={({ onChange, value }) => (
                <Fragment>
                  <RadioGroup
                    row
                    aria-label='position'
                    name='position'
                    defaultValue={initValue['gender']}
                    style={{ padding: '0 0 0 15px', justifyContent: 'space-between' }}
                    onChange={(event, val) => {
                      onChange(val);
                    }}
                  >
                    <FormControlLabel
                      style={{ marginRight: 0 }}
                      value='null'
                      control={
                        <Typography className={classes.titleInput} style={{ fontSize: 16 }} variant='inherit'>
                          {t('account.detail.info.gender')}
                        </Typography>
                      }
                      label={''}
                    />
                    <FormControlLabel
                      style={{ marginRight: 0 }}
                      value='male'
                      control={<Radio color='primary' />}
                      label={t('account.detail.info.genderOptions.male')}
                    />
                    <FormControlLabel
                      style={{ marginRight: 0 }}
                      value='female'
                      control={<Radio color='primary' />}
                      label={t('account.detail.info.genderOptions.female')}
                    />
                    <FormControlLabel
                      style={{ marginRight: 0 }}
                      value='other'
                      control={<Radio color='primary' />}
                      label={t('account.detail.info.genderOptions.other')}
                    />
                  </RadioGroup>
                </Fragment>
              )}
            />
          </Grid>
        </Grid>
      </form>
      <SelectionModal
        shown={isShownPopupArea}
        title={t('account.detail.info.selectArea')}
        items={cityDistricts.map((cd) => {
          return { id: cd.value, name: cd.label };
        })}
        onSelected={(id) => {
          setShownPopupArea(false);
          if (id !== getValues('city_district')) {
            setValue('city_district', id);
            setValue('ward', null);
            const cityId = id.split('_')[0];
            const districtId = id.split('_')[1];
            updateWardByCityAndDistrict(cityId, districtId);
            setTimeout(() => {
              setShownPopupWard(true);
            }, 500);
          }
        }}
        selectedId={getValues('city_district')}
      />
      <SelectionModal
        shown={isShownPopupWard}
        title={t('account.detail.info.chooseWard2')}
        items={wards.map((cd) => {
          return { id: cd.value.toString(), name: cd.label };
        })}
        onSelected={(id) => {
          setShownPopupWard(false);
          setValue('ward', id);
        }}
        selectedId={getValues('ward')}
      />
    </MobileLayout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(updateProfileStyles)(MobileUpdateProfile);
