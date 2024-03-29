import React from 'react';
import { Button, Grid, ListItem, WithStyles } from '@material-ui/core';
import styles from './AccessibleTenants.styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { TenantResponse } from '../../../services/Model';
import getConfig from 'next/config';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'next-i18next';

interface TenantRowProps extends WithStyles<any> {
  tenant: TenantResponse;
  index: number;
  lastIndex: number;
}

const {
  publicRuntimeConfig: { sapoAccountsBaseUrl },
} = getConfig();

export const TenantRow: React.FC<TenantRowProps> = (props: TenantRowProps) => {
  const { classes, tenant, index, lastIndex } = props;
  const { t } = useTranslation('common');
  const accessToSite = (clientId: string, tenantId: number) => {
    if (clientId !== undefined && tenantId != undefined) {
      window.open(`${sapoAccountsBaseUrl}/sso/${clientId}/${tenantId}`);
    } else {
      window.open(`${sapoAccountsBaseUrl}/sso`);
    }
  };

  return (
    <React.Fragment>
      <ListItem className={classes.tenantItemRow}>
        <Grid container direction='row' justify='space-between'>
          <Grid item>
            <Typography style={{ fontWeight: 'bold', fontSize: '14px' }}>{tenant.name}</Typography>
            <Typography style={{ fontSize: '13px' }}>{tenant.domain + tenant.service_domain}</Typography>
          </Grid>
          <Link
            style={{ textTransform: 'unset', display: 'flex', alignItems: 'center' }}
            onClick={() => accessToSite(tenant.client_id, tenant.id)}
            href={'#'}
          >
            {t('store.detail.accessStore')}
          </Link>
        </Grid>
      </ListItem>
      {index != lastIndex && <Divider className={classes.dividerStyle} />}
    </React.Fragment>
  );
};
