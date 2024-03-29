import { Grid, TextField, Typography } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import LazyLoadingSelect from './CustomSelect';
import React, { Fragment, useEffect, useState } from 'react';
import { NextClientService } from '../../../services/NextClientService';
import { AccountDetailProps } from '../Detail';
import { useTranslation } from 'next-i18next';
interface AddressDetailProp extends AccountDetailProps {
  control;
  setValueHookForm;
  getValueHookForm;
  register;
  setUpdating;
  isUpdate;
}
type OptionSelection = {
  value: any;
  label: string;
  data: any;
  disabled: boolean;
};

function AddressDetail(props: AddressDetailProp) {
  const { classes, user, control, setValueHookForm, getValueHookForm, register, setUpdating, isUpdate } = props;
  const [cityDistricts, setCityDistricts] = useState<OptionSelection[]>([]);
  const [cityDistrict, setCityDistrict] = useState<OptionSelection>();
  const { t } = useTranslation('common');
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
    updateCitiDistrictByUser();
  }, [getValueHookForm('city_district'), cityDistricts]);
  useEffect(() => {
    const cityDistrict = getValueHookForm('city_district');
    if (cityDistrict) {
      const cityId = cityDistrict.split('_')[0];
      const districtId = cityDistrict.split('_')[1];
      updateWardByCityAndDistrict(cityId, districtId);
    }
  }, [getValueHookForm('ward'), cityDistrict]);

  const updateCitiDistrictByUser = () => {
    const cityDistrict = getValueHookForm('city_district');
    if (cityDistrict) {
      setCityDistrict(cityDistricts.find((ctdt) => ctdt.value === cityDistrict));
    }
  };

  const updateWardByCityAndDistrict = (cityId: number, districtId: number) => {
    NextClientService.getSapoWard(user.country_id, cityId, districtId).then((wardRes) => {
      setWards(
        wardRes.data.wards.map((ward) => {
          return { value: ward.id, label: ward.name, disabled: false, data: ward };
        }),
      );
    });
  };

  const updateCityDistrict = (onChange) => {
    return (data) => {
      if (data) {
        onChange(data.value);
        updateWardByCityAndDistrict(data.data.city.id, data.data.district.id);
        setValueHookForm('ward', null);
      } else {
        setValueHookForm('ward', null);
        onChange(null);
        setWards([]);
        setValueHookForm('ward', null);
      }
      setUpdating(isUpdate);
    };
  };
  const updateWard = (onChange) => {
    return (data) => {
      onChange(data?.value);
      setUpdating(isUpdate);
    };
  };

  const updateAddress = () => {
    setUpdating(isUpdate);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
        <Typography className={classes.titleInput} variant='inherit'>
          {t('account.detail.info.area')}
        </Typography>
        <Controller
          name={'city_district'}
          id={'city_district-input'}
          control={control}
          defaultValue={cityDistrict}
          render={({ onChange, value }) => (
            <LazyLoadingSelect
              options={cityDistricts}
              value={cityDistrict}
              clearable={true}
              setValue={(valueUpdate) => {
                setCityDistrict(valueUpdate);
                updateCityDistrict(onChange)(valueUpdate);
              }}
              placeholder={t('account.detail.info.chooseCityDistrict')}
              noResultsText={''}
              style={{ marginTop: '0.5rem', height: '40px' }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
        <Typography className={classes.titleInput} variant='inherit'>
          {t('account.detail.info.ward')}
        </Typography>
        <Controller
          name={'ward'}
          id={'ward-input'}
          control={control}
          defaultValue={getValueHookForm('ward')}
          render={({ onChange, value }) => (
            <LazyLoadingSelect
              options={wards}
              value={value}
              clearable={true}
              setValue={(valueUpdate) => {
                setValueHookForm('ward', valueUpdate?.value);
                updateWard(onChange)(valueUpdate);
              }}
              placeholder={t('account.detail.info.chooseWard')}
              noResultsText={''}
              style={{ marginTop: '0.5rem', height: '40px' }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.flexBoxColumnSpaceBetween}>
        <Typography className={classes.titleInput} variant='inherit'>
          {t('account.detail.info.address')}
        </Typography>
        <TextField
          type={'text'}
          name={'address'}
          defaultValue={getValueHookForm('address')}
          onFocus={() => setUpdating(false)}
          onBlur={() => setUpdating(isUpdate)}
          inputRef={register}
          onChange={updateAddress}
          style={{ marginTop: '0.5rem' }}
          fullWidth={true}
          variant='outlined'
          size='small'
        />
      </Grid>
    </Fragment>
  );
}
export default AddressDetail;
