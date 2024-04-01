import { TenantResponse, User } from '../../services/Model';
import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import { Button, Divider, IconButton, ListItemText, Typography, WithStyles, withStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import MobileLayout from '../../components/layouts/MobileLayout';
import { useTranslation } from 'next-i18next';
import updateProfileStyles from '../../components/Common/mobile/UpdateProfile';

import { EditIcon } from '../../components/icons/mobile';
import MobileStoreIcon from '../../components/icons/mobile/MobileStoreIcon';
import RightThanIcon from '../../components/icons/mobile/RightThanIcon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import MobileStoreActiveIcon from '../../components/icons/mobile/MobileStoreActiveIcon';
import getConfig from 'next/config';
export interface MobileUpdateProfileProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
  appSource: string;
  store: string;
}
export const sortTenantsByLastAccess = (
  { last_access_date: last_access_date1 },
  { last_access_date: last_access_date2 },
) => {
  return last_access_date1 === null
    ? 1
    : last_access_date2 === null
      ? -1
      : last_access_date1 === last_access_date2
        ? 0
        : new Date(last_access_date1).getTime() - new Date(last_access_date2).getTime()
          ? -1
          : 1;
};
const {
  publicRuntimeConfig: {
    POS_CLIENT_ID,
    WEB_CLIENT_ID,
    POS_DOMAIN,
    WEB_DOMAIN,
    sapoAccountsBaseUrl,
    coreClientId,
    coreOAuthCallback,
    registerUrl,
    homePageUrl,
  },
} = getConfig();
export const fillTenantDomain = (tenant: TenantResponse): TenantResponse => {
  return { ...tenant, full_url: tenant.domain + (tenant.client_id === WEB_CLIENT_ID ? WEB_DOMAIN : POS_DOMAIN) };
};

function MobileStores(props: MobileUpdateProfileProps & InferWithAuthServerSideProps<typeof getServerSideProps>) {
  const { classes, user, appSource, store } = props;
  const appClientId = appSource === 'APP_WEB' ? WEB_CLIENT_ID : POS_CLIENT_ID;
  const { t } = useTranslation('common');
  const router = useRouter();
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
  const onGotoStore = (clientId, tenantId) => {
    window.location.href = `${sapoAccountsBaseUrl}/sso/${clientId}/${tenantId}`;
  };
  const hiddenTenants = user.tenants.filter((tenant) => !tenant.visible && tenant.client_id === appClientId).length;
  return (
    <MobileLayout
      propParent={{ style: { backgroundColor: '#F6F7FB', padding: '46px 0 0 0', height: '100vh' } }}
      title={t('store.detail.listStore')}
      leftArea={{}}
      rightArea={{ content: iconRight() }}
    >
      <div className={classNames(classes.borderBottom, classes.mainArea)}>
        {user.tenants
          .filter((tenant) => tenant.client_id === appClientId && tenant.visible)
          .sort(sortTenantsByLastAccess)
          .map(fillTenantDomain)
          .sort((a, b) => (b.full_url === store ? 1 : -1))
          .map((tenant, i, all) => {
            return (
              <Fragment key={tenant.id + 'tenant'}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', minHeight: '80px', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '70%' }}>
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
                          fontSize: 16,
                          paddingRight: '10px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                      secondaryTypographyProps={{
                        style: {
                          fontSize: 13,
                          paddingRight: '10px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    />
                  </div>
                  {tenant.full_url === store ? (
                    <Typography style={{ color: '#0FD186', fontSize: 13 }}>{t('store.detail.accessing')}</Typography>
                  ) : (
                    <Button
                      variant='outlined'
                      style={{ color: '#FFFFFF', backgroundColor: '#0088FF' }}
                      type='submit'
                      color='inherit'
                      onClick={() => onGotoStore(tenant.client_id, tenant.id)}
                    >
                      {t('store.detail.accessTo')}
                    </Button>
                  )}
                </div>
                {i !== all.length - 1 ? <Divider /> : ''}
              </Fragment>
            );
          })}
      </div>
      {hiddenTenants > 0 ? (
        <div
          className={classNames(classes.borderTop, classes.borderBottom, classes.mainArea)}
          style={{ marginTop: '11px', marginBottom: '12px' }}
        >
          <Button
            onClick={() => router.push('/m/store_setup')}
            className={classNames(classes.actionView, classes.unsetBorder, classes.hiddenStore)}
            variant='contained'
            type='submit'
            style={{ paddingTop: 'inherit' }}
          >
            <div className={classes.actionContent}>
              {t('store.detail.hiddenStore', { hiddenTenants: hiddenTenants })}
            </div>

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

export default withStyles(updateProfileStyles)(MobileStores);
