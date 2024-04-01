import { Button, Grid, withStyles } from '@material-ui/core';
import profileIndexStyles from 'components/Common/mobile/Profile';
import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Avatar from 'react-avatar';
import { AccountLinkedIcon, ContractsIcon, EditIcon, PrintIcon, StoreIcon } from '../../components/icons/mobile';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'next-i18next';
import Typography from '@material-ui/core/Typography';
import RightThanIcon from '../../components/icons/mobile/RightThanIcon';
import { NextClientService } from '../../services/NextClientService';
import { SapoCityDistrict, User } from '../../services/Model';
import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import BlankLayout from '../../components/layouts/BlankLayout';
import { DateTimeUtil } from '../../utils/DateTimeUtil';

type OptionSelection = {
  value: any;
  label: string;
  disabled: boolean;
};
type ActionView = {
  icon: JSX.Element;
  label: string;
  action: string;
  content?: JSX.Element | undefined;
};
interface MobileIndexProp {
  user: User;
  classes: any;
}
function MobileIndex(props: MobileIndexProp & InferWithAuthServerSideProps<typeof getServerSideProps>) {
  const { user, classes, store } = props;
  const { t } = useTranslation('common');
  const [userAddress, setUserAddress] = useState<string>(user.address);
  const userInformation = (type, value) => {
    return (
      <Grid container direction='row' justify='space-between' className={classes.userInformation}>
        <Grid item style={{ width: '75px' }}>
          <Typography>{type}</Typography>
        </Grid>
        <Grid item style={{ width: 'calc(100% - 75px)', display: 'table', tableLayout: 'fixed' }}>
          <Typography style={{ wordWrap: 'break-word', display: 'table-cell' }}>:&nbsp;{value}</Typography>
        </Grid>
      </Grid>
    );
  };
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
  const actionView = (action: ActionView) => {
    return (
      <Link href={action.action}>
        <Button className={classes.actionView} variant='contained' type='submit'>
          <div className={classes.actionIcon}>{action.icon}</div>
          <div className={classes.actionContent}>{action.content || action.label}</div>

          <div className={classes.actionLink}>
            <RightThanIcon />
          </div>
        </Button>
      </Link>
    );
  };
  const onFinish = () => {
    NextClientService.getAppSource().then((res) => {
      window.location.href = res.data.appSource + 'close-profile';
    });
  };

  const onLogout = () => {
    NextClientService.getAppSource().then((res) => {
      window.location.href = res.data.appSource + 'logout';
    });
  };
  useEffect(() => {
    getFullAddress();
  }, []);

  const getFullAddress = () => {
    let cityDistrictsPromise = NextClientService.getSapoCityDistricts(user.country_id);
    if (user.ward_id) {
      let wardsPromise = NextClientService.getSapoWard(user.country_id, user.city_id, user.district_id);
      Promise.all([cityDistrictsPromise, wardsPromise]).then((res) => {
        const [cityDistricts, wards] = res;
        const cityDistrictUser = getCityDistrictUser(cityDistricts.data.city_districts);
        const wardUser = wards.data.wards.find((w) => w.id === parseInt(String(user.ward_id)))?.name;
        setUserAddress(`${user.address ? userAddress + ', ' : ''}${wardUser}, ${cityDistrictUser}`);
      });
    } else if (user.district_id) {
      cityDistrictsPromise.then((res) => {
        setUserAddress(`${user.address ? user.address + ', ' : ''}${getCityDistrictUser(res.data.city_districts)}`);
      });
    }
    const getCityDistrictUser = (cityDistricts: SapoCityDistrict[]) => {
      const cityDistrict = cityDistricts.find((cd) => cd.id === `${user.city_id}_${user.district_id}`);
      return cityDistrict.district.name + ', ' + cityDistrict.city.name;
    };
  };
  return (
    <BlankLayout title={t('account.title')}>
      <Grid container className={classes.doneHeader} justify='flex-end'>
        <Link
          style={{
            textTransform: 'unset',
            display: 'flex',
            alignItems: 'center',
            paddingRight: 5,
            paddingTop: 10,
            fontWeight: 'normal',
            color: '#666970',
          }}
          onClick={onFinish}
          href={'#'}
        >
          {t('action.finish')}
        </Link>
      </Grid>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.profile}>
                <Avatar
                  name={user.full_name}
                  style={{ marginTop: '-35px' }}
                  maxInitials={1}
                  textSizeRatio={1.5}
                  size='70'
                  round={true}
                />
                <Link href={'/m/update_profile'}>
                  <EditIcon className={classes.editIcon} />
                </Link>
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>{user.full_name}</h3>
              </div>
            </GridItem>
          </GridContainer>
          <div className={classes.description}>
            {userInformation(
              t('account.detail.info.phoneNumberMin'),
              !user.phone_number ? '---' : `(+${user.country_code}) ${user.phone_number.substr(1)}`,
            )}
            {userInformation(t('account.detail.info.email'), user.email || '---')}
            {userInformation(
              t('account.detail.info.gender'),
              user.gender
                ? genderOptions.find((opt) => opt.value === user.gender)?.label
                : t('account.detail.info.genderOptions.other'),
            )}
            {userInformation(t('account.detail.info.dob'), !user.dob ? '---' : DateTimeUtil.format(user.dob))}
            {userInformation(t('account.detail.info.address'), userAddress || '---')}
          </div>
        </div>
      </div>
      <div className={classes.actionViewRaised}>
        {user.country_code === '66'
          ? ''
          : actionView({ icon: <ContractsIcon />, label: t('contract.title'), action: '/m/contracts' })}
        {user.country_code === '66'
          ? ''
          : actionView({ icon: <PrintIcon />, label: 'Quản lý thiết bị', action: '/m/devices' })}
        {actionView({
          icon: <StoreIcon />,
          label: t('store.detail.listStore'),
          action: '/m/stores',
          content: (
            <Fragment>
              <Typography>{t('store.detail.listStore')}</Typography>
              <Typography className={classes.contentStore}>
                {t('store.detail.accessingStore', { store: store || '1992watches.mysapo.vn' })}
              </Typography>
            </Fragment>
          ),
        })}
        {actionView({ icon: <AccountLinkedIcon />, label: t('connectSocial.titleMobile'), action: '/m/social' })}
      </div>
      -
      <div className={classes.linkedAction} style={{ padding: '16px 0 12px 0' }}>
        <Link href={'/m/change_password'} style={{ fontWeight: 400 }}>
          {t('account.detail.changePassword.title')}
        </Link>
      </div>
      <div className={classes.linkedAction}>
        <Link onClick={onLogout} href={'#'} style={{ fontWeight: 400 }}>
          {t('action.logout')}
        </Link>
      </div>
    </BlankLayout>
  );
}
export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(profileIndexStyles)(MobileIndex);
