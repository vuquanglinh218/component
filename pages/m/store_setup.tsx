import { TenantResponse, User } from '../../services/Model';
import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  ListItemText,
  Switch,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import MobileLayout from '../../components/layouts/MobileLayout';
import { useTranslation } from 'next-i18next';
import updateProfileStyles from '../../components/Common/mobile/UpdateProfile';

import MobileStoreIcon from '../../components/icons/mobile/MobileStoreIcon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import IOSSwitch from '../../components/Common/mobile/IOSSwitch';
import MobileStoreActiveIcon from '../../components/icons/mobile/MobileStoreActiveIcon';
import getConfig from 'next/config';
import { fillTenantDomain } from './stores';
import { NextClientService } from '../../services/NextClientService';
import RightThanIcon from '../../components/icons/mobile/RightThanIcon';
import { EditIcon } from '../../components/icons/mobile';
export interface MobileUpdateProfileProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
  appSource: string;
}
const {
  publicRuntimeConfig: { POS_CLIENT_ID, WEB_CLIENT_ID },
} = getConfig();

function MobileStoresSetup(props: MobileUpdateProfileProps & InferWithAuthServerSideProps<typeof getServerSideProps>) {
  const { classes, user, appSource, store } = props;
  const router = useRouter();
  const { isEdit } = router.query;
  const { t } = useTranslation('common');
  const appClientId = appSource === 'APP_WEB' ? WEB_CLIENT_ID : POS_CLIENT_ID;
  const [tenants, setTenants] = useState(
    user.tenants
      .filter((tenant) => tenant.client_id === appClientId && (isEdit ? true : !tenant.visible))
      .map(fillTenantDomain)
      .sort((a, b) => (a.visible === b.visible ? 0 : a.visible ? 1 : -1))
      .sort((a, b) => (b.full_url === store ? 1 : -1)),
  );

  const action = () => {
    return () => router.push('/m/stores');
  };
  const onChange = (tenant: TenantResponse) => {
    tenant.visible = !tenant.visible;
    setTenants([...tenants]);
    NextClientService.setVisibleTenant({
      set_visible_tenant: {
        tenant_id: tenant.id,
        visible: tenant.visible,
      },
    }).catch(() => {
      tenant.visible = !tenant.visible;
      setTenants([...tenants]);
    });
  };
  const iconRight = () => {
    return (
      <IconButton
        color='inherit'
        edge='start'
        onClick={() => router.push('/m/store_setup?isEdit=true')}
        style={{ marginRight: '-16px' }}
        className={classes.menuButton}
      >
        <EditIcon fill={'#666970'} />
      </IconButton>
    );
  };
  return (
    <MobileLayout
      propParent={{ style: { backgroundColor: '#F6F7FB', padding: '46px 0 0 0' } }}
      title={isEdit ? t('store.detail.storeSetup') : t('store.detail.listStore')}
      leftArea={{ action }}
      rightArea={isEdit ? null : { content: iconRight() }}
    >
      <div className={classNames(classes.borderBottom, classes.mainArea)}>
        {tenants &&
          tenants.map((tenant, i, all) => (
            <Fragment key={tenant.id}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', minHeight: '75px', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: isEdit ? '70%' : '100%' }}>
                  {tenant.full_url === store ? (
                    <MobileStoreActiveIcon width={32} height={32} />
                  ) : (
                    <MobileStoreIcon width={32} height={32} />
                  )}
                  <span style={{ width: '16px' }} />
                  <ListItemText
                    primary={tenant.name}
                    style={{ width: '70%' }}
                    secondary={tenant.full_url}
                    primaryTypographyProps={{
                      style: {
                        fontSize: 14,
                        paddingRight: '10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }}
                    secondaryTypographyProps={{
                      style: {
                        paddingRight: '10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                </div>
                {tenant.full_url !== store && isEdit ? (
                  <IOSSwitch checked={tenant.visible} onChange={() => onChange(tenant)} />
                ) : (
                  ''
                )}
              </div>
              {i !== all.length - 1 ? <Divider /> : ''}
            </Fragment>
          ))}
      </div>
      {!isEdit ? (
        <div
          className={classNames(classes.borderTop, classes.borderBottom, classes.mainArea)}
          style={{ marginTop: '11px', marginBottom: '12px' }}
        >
          <Button
            onClick={() => router.push('/m/stores')}
            className={classNames(classes.actionView, classes.unsetBorder, classes.hiddenStore)}
            variant='contained'
            type='submit'
            style={{ paddingTop: 'inherit' }}
          >
            <div className={classes.actionContent}>{t('store.detail.selectStore')}</div>

            <div className={classes.actionLink}>
              <RightThanIcon style={{ width: '12px' }} />
            </div>
          </Button>
        </div>
      ) : (
        ''
      )}
    </MobileLayout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(updateProfileStyles)(MobileStoresSetup);
