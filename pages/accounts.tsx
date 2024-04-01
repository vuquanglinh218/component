import React, { useEffect, useState } from 'react';
import CategoryText from '../components/CategoryText/CategoryText';
import Detail from '../components/AccountDetail/Detail';
import { Grid, Hidden, WithStyles, withStyles } from '@material-ui/core';
import commonStyles from '../components/Common/CommonStyles';
import { ConnectSocialAccounts } from '../components/ConnectSocialAccount';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import NotificationContent from '../components/Utils/NotificationContent';
import { Fragment } from 'react';
import {
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
  getAuthServerSideProps,
  getAuthAndLocaleServerSideProps,
} from '../hocs/withAuthServerSideProps';
import Layout from '../components/layouts/Layout';

type AccountProps = WithStyles<any> & InferWithAuthServerSideProps<typeof getServerSideProps>;

function Account(props: AccountProps) {
  const { classes, user, isMobileApp } = props;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const connectionStatus = router.query.connection_status;
  const [username, setUsername] = useState<string>(user.full_name);
  const { t } = useTranslation('common');
  const pushLinkedWithSocialSuccessNoti = () => {
    enqueueSnackbar(<NotificationContent content={t('notification.social.linkedSuccessful')} variant={'success'} />, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
  };
  const pushLinkedWithSocialFailNoti = () => {
    enqueueSnackbar(<NotificationContent content={t('notification.social.linkedOtherAccount')} variant={'error'} />, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
  };
  useEffect(() => {
    if (connectionStatus) {
      window.history.pushState(null, '', '/accounts');
    }

    if (connectionStatus === 'success') {
      pushLinkedWithSocialSuccessNoti();
    } else if (connectionStatus === 'error') {
      pushLinkedWithSocialFailNoti();
    }
  }, []);

  const information = (
    <Fragment>
      <Grid item xs={12} lg={4}>
        <CategoryText captionText={t('account.title')} detailText={t('account.detailText')} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <Detail classes={classes} user={user} setUsername={setUsername} userName={username} />
      </Grid>
    </Fragment>
  );
  const connectSocial = (
    <Fragment>
      <Grid item xs={12} lg={4} style={{ paddingBottom: 0 }}>
        <CategoryText captionText={t('connectSocial.title')} detailText={t('connectSocial.detailText')} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ConnectSocialAccounts
          pushLinkedWithSocialSuccessNoti={pushLinkedWithSocialSuccessNoti}
          pushLinkedWithSocialFailNoti={pushLinkedWithSocialFailNoti}
          classes={classes}
          user={user}
        />
      </Grid>
    </Fragment>
  );
  return (
    <Layout
      hiddenContract={user.country_code === '66'}
      title={t('account.title')}
      username={username}
      marginLeftRight={false}
    >
      <Hidden xsDown implementation='css'>
        <Grid container direction='column' spacing={2} className={classes.outermostGridDisplayBlock}>
          <Grid
            item
            container
            direction='row'
            spacing={3}
            className={classes.grandFatherGridPaddingTopBot}
            style={{ marginTop: 12 }}
          >
            {information}
            {connectSocial}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp implementation='css'>
        <div className={classes.areaContentWithMarginBottom}>
          <Grid container direction='column' spacing={2} className={classes.outermostGridDisplayBlock}>
            <Grid
              item
              container
              direction='row'
              spacing={3}
              className={classes.grandFatherGridPaddingTopBot}
              style={{ marginTop: 12 }}
            >
              {information}
            </Grid>
          </Grid>
        </div>
        <div className={classes.areaContent}>
          <Grid container direction='column' spacing={2} className={classes.outermostGridDisplayBlock}>
            <Grid item container direction='row' spacing={3} className={classes.grandFatherGridPaddingConnectSocial}>
              {connectSocial}
            </Grid>
          </Grid>
        </div>
      </Hidden>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(Account);
