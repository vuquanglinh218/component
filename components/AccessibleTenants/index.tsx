import React from 'react';
import getConfig from 'next/config';
import { Button, Grid, Hidden, Paper, withStyles, WithStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import accessibleTenantsStyles from './components/AccessibleTenants.styles';
import { TenantRow } from './components/AccessibleTenants.component';
import CategoryText from '../CategoryText/CategoryText';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import { User } from '../../services/Model';

const {
  publicRuntimeConfig: { sapoAccountsBaseUrl, coreClientId, coreOAuthCallback, registerUrl, homePageUrl },
} = getConfig();

interface AccessibleTenantProps extends WithStyles<any> {
  user: User;
}

function AccessibleTenants(props: AccessibleTenantProps) {
  const { classes, user } = props;
  const { t } = useTranslation('common');
  const accessibleTenant = user.tenants;
  const tenants = (
    <Fragment>
      <Grid item xs={12} lg={8} style={{ marginBottom: '1rem', paddingRight: '38px' }}>
        {accessibleTenant.length > 0 ? (
          <Paper variant='outlined' className={classes.detailPaperWithBorder} style={{ border: 'unset' }}>
            <Grid
              container
              direction='row'
              spacing={1}
              style={{ margin: 'unset', width: 'auto ', border: '1px solid #D3D5D7' }}
            >
              {accessibleTenant &&
                accessibleTenant.map((tenant, i) => (
                  <TenantRow
                    classes={classes}
                    key={i}
                    index={i}
                    lastIndex={accessibleTenant.length - 1}
                    tenant={tenant}
                  />
                ))}
            </Grid>
          </Paper>
        ) : (
          <Paper variant='outlined' className={classes.detailPaperWithBorder} style={{ border: 'unset' }}>
            <Grid container justify={'center'} className={classes.fatherGridWithPadding}>
              <Grid container item xs justify={'center'}>
                <Grid item xs={12}>
                  <Typography style={{ textAlign: 'center' }}>{t('store.detail.cannotAccessToStore')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Hidden xsDown implementation='css'>
                    <Typography style={{ margin: 0, width: '100%', textAlign: 'center' }}>
                      <span>{t('store.detail.tryForFreeLabel')} </span>
                      <Link
                        href={`${sapoAccountsBaseUrl}/oauth/authorize?client_id=${coreClientId}&redirect_uri=${coreOAuthCallback}&state={%22redirectUrl%22:%22${registerUrl}%22,%22type%22:%22signup%22}&scope=profile&response_type=code`}
                        target={'_blank'}
                      >
                        {t('store.detail.fromHere')}
                      </Link>
                      .
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>
    </Fragment>
  );
  const descriptionPage = (
    <Grid item xs={12} lg={4}>
      <CategoryText captionText={t('store.detail.listStore')} detailText={t('store.detail.description')} />
      <Button
        onClick={() =>
          (window.location.href =
            user.country_code === '84'
              ? `${sapoAccountsBaseUrl}/oauth/authorize?client_id=${coreClientId}&redirect_uri=${coreOAuthCallback}&state={%22redirectUrl%22:%22${registerUrl}%22,%22type%22:%22signup%22}&scope=profile&response_type=code`
              : homePageUrl)
        }
        variant='outlined'
        className={classes.registerButton}
      >
        {t('store.detail.tryForFree')}
      </Button>
    </Grid>
  );
  return (
    <Grid
      item
      container
      direction='row'
      style={{ marginBottom: '0', minHeight: '200px', paddingTop: 0 }}
      className={classes.grandFatherGridPaddingTopBot}
    >
      <React.Fragment>
        <Hidden xsDown implementation='js'>
          <Grid container direction='column' spacing={2} className={classes.outermostGridDisplayBlock}>
            <Grid
              item
              container
              direction='row'
              spacing={3}
              className={classes.grandFatherGridPaddingTopBot}
              style={{ paddingTop: 0 }}
            >
              {descriptionPage}
              {tenants}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smUp implementation='css'>
          <Grid
            item
            container
            direction='row'
            spacing={3}
            className={classes.grandFatherGridPaddingTopBotTenant}
            style={{ paddingTop: 0 }}
          >
            <Grid item xs={12} lg={4} style={{ paddingBottom: 0 }}>
              <CategoryText captionText={t('store.detail.listStore')} detailText={t('store.detail.description')} />
            </Grid>
            {tenants}
          </Grid>
        </Hidden>
      </React.Fragment>
    </Grid>
  );
}

export default withStyles(accessibleTenantsStyles)(AccessibleTenants);
