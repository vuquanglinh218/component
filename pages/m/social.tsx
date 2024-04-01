import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  ListItemText,
  Modal,
  Paper,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import updateProfileStyles from '../../components/Common/mobile/UpdateProfile';
import MobileLayout from '../../components/layouts/MobileLayout';
import { User } from '../../services/Model';
import Image from 'next/image';
import React, { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';
import { NextClientService } from '../../services/NextClientService';
import NotificationContent from '../../components/Utils/NotificationContent';
import getConfig from 'next/config';
import { signIn } from 'next-auth/client';
import ErrorNoteIcon from '../../components/icons/mobile/ErrorNoteIcon';
import { useRouter } from 'next/router';
import CloseIcon from '@material-ui/icons/Close';

interface MobileConnectSocialProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
}
type Provider = 'Google' | 'Facebook' | 'Apple';
const {
  publicRuntimeConfig: { baseUrl, sapoAccountsBaseUrl, facebookId },
} = getConfig();
function MobileConnectSocial(
  props: MobileConnectSocialProps & InferWithAuthServerSideProps<typeof getServerSideProps>,
) {
  const { classes, user } = props;
  const [stateUser, setStateUser] = useState(user);
  const [removeConnectModal, setRemoveConnectModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [removeProvider, setRemoveProvider] = useState<Provider>();
  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const connectionStatus = router.query.connection_status;
  useEffect(() => {
    if (connectionStatus) {
      window.history.pushState(null, '', '/m');
    }

    if (connectionStatus === 'success') {
      pushLinkedWithSocialSuccessNoti();
    } else if (connectionStatus === 'error') {
      pushLinkedWithSocialFailNoti();
    }
  }, []);
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
  const linkAppleId = () => {
    window.location.href =
      `${sapoAccountsBaseUrl}/oauth2/authorize/apple?type=LINK_APPLE_ID` +
      `&success_redirect=${baseUrl}/m/social?connection_status=success` +
      `&fail_redirect=${baseUrl}/m/social?connection_status=error`;
  };

  useEffect(() => {
    const lang = i18n.language === 'th' ? 'th_TH' : i18n.language === 'en' ? 'en_US' : 'vi_VN';
  }, []);
  const removeConnect = async () => {
    setSubmitting(true);
    const res = await NextClientService.removeSocialConnect(removeProvider.toLowerCase());
    if (res.status === 200) {
      enqueueSnackbar(
        <NotificationContent content={t('connectSocial.action.removeSocialLinkedSuccess')} variant={'success'} />,
        {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 4000,
        },
      );
    }
    let tempUser = { ...stateUser };
    tempUser[removeProvider.toLowerCase() + '_account_id'] = null;
    tempUser[removeProvider.toLowerCase() + '_account_email'] = null;
    tempUser[removeProvider.toLowerCase() + '_account_name'] = null;
    setStateUser(tempUser);
    setRemoveConnectModal(false);
    setSubmitting(false);
  };

  const socialLinkedInfo = (provider: Provider, info: { name: string; email: string }) => {
    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: '90px',
            alignItems: 'center',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '66%' }}>
            <Image
              src={`/static/${provider.toLowerCase()}.svg`}
              alt={`${provider.toLowerCase()}-account`}
              width='30'
              height='30'
            />
            <span style={{ width: '16px' }} />
            <ListItemText
              primary={info.name || info.email}
              secondary={info.email}
              primaryTypographyProps={{
                style: {
                  fontSize: 16,
                  paddingRight: '10px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 400,
                },
              }}
              secondaryTypographyProps={{
                style: {
                  paddingRight: '10px',
                  fontSize: 13,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              }}
            />
          </div>
          <Button
            variant='outlined'
            style={{ color: '#EB3838', borderColor: '#EB3838', fontSize: 15, width: 'fit-content' }}
            type='submit'
            color='inherit'
            onClick={() => openPromptModel(provider)}
            classes={{
              label: classes.buttonLabelFit,
            }}
          >
            {t('connectSocial.action.removeSocial')}
          </Button>
        </div>
      </Fragment>
    );
  };
  const connectSocial = (provider: Provider, action: MouseEventHandler) => {
    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: '90px',
            alignItems: 'center',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '66%' }}>
            <Image
              src={`/static/${provider.toLowerCase()}.svg`}
              alt={`${provider.toLowerCase()}-account`}
              width='30'
              height='30'
            />
            <span style={{ width: '16px' }} />
            <Typography style={{ fontSize: 16, fontWeight: 400 }}>{provider}</Typography>
          </div>
          <Button
            variant='outlined'
            style={{ color: '#FFFFFF', backgroundColor: '#0088FF', fontSize: 15 }}
            type='submit'
            color='inherit'
            onClick={action}
          >
            {t('connectSocial.action.linkWithAccountShort')}
          </Button>
        </div>
      </Fragment>
    );
  };
  const openPromptModel = (provider: Provider) => {
    setRemoveConnectModal(true);
    setRemoveProvider(provider);
  };

  const closePromptModal = () => {
    setRemoveConnectModal(false);
    setRemoveProvider(null);
  };

  const modalUnlinkSocial = (
    <Grid container direction='column'>
      <Grid item className={classes.popUpGridChangePass} style={{ padding: '8px' }}>
        <Typography className={classes.modalTypoTitle} variant='h1'>
          {t('connectSocial.action.removeWithSocial')}
        </Typography>
        <CloseIcon style={{ cursor: 'pointer' }} width={24} height={24} onClick={closePromptModal} />
      </Grid>
      <Divider />
      <Grid item className={classes.popUpGridChangePass} style={{ padding: '8px' }}>
        {'Facebook' === removeProvider ? (
          <Typography style={{ fontSize: '14px' }}>{t('connectSocial.action.confirmRemoveSocialFacebook')}</Typography>
        ) : 'Google' === removeProvider ? (
          <Typography style={{ fontSize: '14px' }}>{t('connectSocial.action.confirmRemoveSocialGoogle')}</Typography>
        ) : 'Apple' === removeProvider ? (
          <Typography style={{ fontSize: '14px' }}>{t('connectSocial.action.confirmRemoveSocialApple')}</Typography>
        ) : (
          <Typography />
        )}
      </Grid>
      <Divider />
      <Grid item className={classes.popUpGridChangePass} style={{ justifyContent: 'flex-end', padding: '8px' }}>
        <Button
          className={classes.buttonCancelUpdate}
          variant='outlined'
          style={{ color: '#182537', borderColor: '#C4CDD5' }}
          color='primary'
          type='submit'
          onClick={closePromptModal}
        >
          {isSubmitting ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : t('action.exit')}
        </Button>
        <Button
          className={classes.buttonSubmitUpdate}
          style={{ marginLeft: '10px', borderRadius: 3, backgroundColor: '#ec5b3e' }}
          variant='contained'
          color='primary'
          type='submit'
          onClick={removeConnect}
        >
          {isSubmitting ? (
            <CircularProgress size={20} color={'inherit'} thickness={4} />
          ) : (
            t('connectSocial.action.removeSocial')
          )}
        </Button>
      </Grid>
    </Grid>
  );
  return (
    <MobileLayout
      title={t('connectSocial.action.linkWithAccount')}
      leftArea={{}}
      propParent={{ style: { backgroundColor: '#F6F7FB', paddingLeft: 0, paddingRight: 0 } }}
    >
      <div style={{ paddingTop: 24 }}>
        {stateUser.google_account_id
          ? socialLinkedInfo('Google', { name: stateUser.google_account_name, email: stateUser.google_account_email })
          : connectSocial('Google', () => signIn('google'))}
        <Divider />
        {stateUser.facebook_account_id
          ? socialLinkedInfo('Facebook', {
              name: stateUser.facebook_account_name,
              email: stateUser.facebook_account_email,
            })
          : connectSocial('Facebook', () => signIn('facebook'))}
        <Divider />
        {stateUser.apple_account_id
          ? socialLinkedInfo('Apple', { name: stateUser.apple_account_name, email: stateUser.apple_account_email })
          : connectSocial('Apple', linkAppleId)}
        <Dialog
          aria-labelledby='customized-dialog-title'
          open={removeConnectModal}
          maxWidth={'md'}
          classes={{ scrollPaper: classes.overrideScrollPaper, paper: classes.overridePaper }}
          closeAfterTransition
          transitionDuration={300}
          onEscapeKeyDown={closePromptModal}
        >
          {modalUnlinkSocial}
        </Dialog>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex' }}>
          <ErrorNoteIcon />{' '}
          <Typography style={{ fontSize: 16, color: '#343741', fontWeight: 500, paddingLeft: '8px' }}>
            {t('account.detail.changePassword.note.title')}
          </Typography>
        </div>
        <Typography style={{ fontSize: 13, color: '#8F9096' }}>{t('connectSocial.detailTextMobile')}</Typography>
      </div>
    </MobileLayout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(updateProfileStyles)(MobileConnectSocial);
