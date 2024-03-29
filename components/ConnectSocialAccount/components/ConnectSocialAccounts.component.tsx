import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';
import { signIn } from 'next-auth/client';
import CloseIcon from '@material-ui/icons/Close';
import { NextClientService } from '../../../services/NextClientService';
import { useSnackbar } from 'notistack';
import getConfig from 'next/config';
import { useTranslation } from 'next-i18next';
import NotificationContent from '../../Utils/NotificationContent';
import commonStyles from '../../Common/CommonStyles';
import { ConnectSocialAccountRequest } from '../../../services/Model';
const {
  publicRuntimeConfig: { baseUrl, sapoAccountsBaseUrl, facebookId },
} = getConfig();

function ConnectSocialAccount(props) {
  const { classes, user, pushLinkedWithSocialSuccessNoti, pushLinkedWithSocialFailNoti } = props;
  const [removeConnectModal, setRemoveConnectModal] = useState(false);
  const [removeProvider, setRemoveProvider] = useState();
  const [stateUser, setStateUser] = useState(user);
  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation('common');

  const openPromptModel = (provider) => {
    setRemoveConnectModal(true);
    setRemoveProvider(provider);
  };

  const closePromptModal = () => {
    setRemoveConnectModal(false);
    setRemoveProvider(null);
  };

  const removeConnect = async () => {
    if (removeProvider != null) {
      const res = await NextClientService.removeSocialConnect(removeProvider);
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
      closePromptModal();
      let tempUser = { ...stateUser };
      tempUser[removeProvider + '_account_id'] = null;
      tempUser[removeProvider + '_account_email'] = null;
      tempUser[removeProvider + '_account_name'] = null;
      setStateUser(tempUser);
    }
  };

  const linkAppleId = () => {
    window.location.href =
      `${sapoAccountsBaseUrl}/oauth2/authorize/apple?type=LINK_APPLE_ID` +
      `&success_redirect=${baseUrl}/accounts?connection_status=success` +
      `&fail_redirect=${baseUrl}/accounts?connection_status=error`;
  };

  useEffect(() => {
    const lang = i18n.language === 'th' ? 'th_TH' : i18n.language === 'en' ? 'en_US' : 'vi_VN';
  }, []);

  const modalUnlinkSocial = (
    <Fragment>
      <Paper style={{ outline: 'none' }} className={classes.modal}>
        <Grid container direction='column'>
          <Grid item className={classes.popUpGridChangePass}>
            <Typography className={classes.modalTypoTitle} variant='h1' style={{ padding: '4px' }}>
              {t('connectSocial.action.removeWithSocial')}
            </Typography>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={closePromptModal} />
          </Grid>
          <Divider />
          <Grid item className={classes.popUpGridChangePass} style={{ padding: '14px' }}>
            {'facebook' === removeProvider ? (
              <Typography>{t('connectSocial.action.confirmRemoveSocialFacebook')}</Typography>
            ) : 'google' === removeProvider ? (
              <Typography>{t('connectSocial.action.confirmRemoveSocialGoogle')}</Typography>
            ) : 'apple' === removeProvider ? (
              <Typography>{t('connectSocial.action.confirmRemoveSocialApple')}</Typography>
            ) : (
              <Typography />
            )}
          </Grid>
          <Divider />
          <Grid item className={classes.popUpGridChangePass} style={{ justifyContent: 'flex-end' }}>
            <Button
              className={classes.buttonCancelUpdate}
              variant='outlined'
              style={{ color: '#182537', borderColor: '#C4CDD5' }}
              color='primary'
              type='submit'
              onClick={closePromptModal}
            >
              {t('action.exit')}
            </Button>
            <Button
              className={classes.buttonSubmitUpdate}
              style={{ marginLeft: '10px', borderRadius: 3, backgroundColor: '#ec5b3e' }}
              variant='contained'
              color='primary'
              type='submit'
              onClick={removeConnect}
            >
              {t('connectSocial.action.removeSocial')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );

  const accountNotLinkedWithSocial = (provider: string) => {
    return (
      <Fragment>
        <Hidden xsDown implementation='css'>
          <ListItemText
            primary={t('connectSocial.action.accountWithoutLink' + provider)}
            primaryTypographyProps={{ style: { fontWeight: 500, fontSize: 14, lineHeight: '48px' } }}
          />
        </Hidden>
        <Hidden smUp implementation='css'>
          <ListItemText
            primary={t('connectSocial.action.accountWithoutLinkSocialShort')}
            primaryTypographyProps={{ style: { fontWeight: 500, fontSize: 14, lineHeight: '48px' } }}
          />
        </Hidden>
      </Fragment>
    );
  };
  const socialLinkedInfo = (name: string, email: string) => {
    if (!name || name.length === 0) name = email;
    return (
      <Fragment>
        <ListItemText
          primary={name}
          secondary={email}
          primaryTypographyProps={{
            style: {
              fontWeight: 500,
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: 'calc(100% - 70px)',
              whiteSpace: 'nowrap',
            },
          }}
          secondaryTypographyProps={{
            style: { overflow: 'hidden', textOverflow: 'ellipsis', width: 'calc(100% - 70px)', whiteSpace: 'nowrap' },
          }}
        />
      </Fragment>
    );
  };
  const socialLinkWithAccountLink = (onClick: any) => {
    return (
      <Fragment>
        <Hidden xsDown implementation='css'>
          <Typography onClick={onClick} className={classes.linkWithSocialLink}>
            {t('connectSocial.action.linkWithAccount')}
          </Typography>
        </Hidden>
        <Hidden smUp implementation='css'>
          <Typography onClick={onClick} className={classes.linkWithSocialLink}>
            {t('connectSocial.action.linkWithAccountShort')}
          </Typography>
        </Hidden>
      </Fragment>
    );
  };
  const removeSocialLinked = (provider: string) => {
    return (
      <Fragment>
        <Typography
          onClick={() => openPromptModel(provider)}
          className={classes.linkWithSocialLink}
          style={{ color: '#FF4D4D' }}
        >
          {t('connectSocial.action.removeSocial')}
        </Typography>
      </Fragment>
    );
  };

  return (
    <Paper variant='outlined' className={classes.detailPaperSocial}>
      <List disablePadding>
        <ListItem>
          <ListItemAvatar>
            <Image src='/static/google.svg' alt='google-account' width='35' height='35' />
          </ListItemAvatar>
          {stateUser.google_account_id != null ? (
            <Fragment>
              {socialLinkedInfo(stateUser.google_account_name, stateUser.google_account_email)}
              {removeSocialLinked('google')}
            </Fragment>
          ) : (
            <Fragment>
              {accountNotLinkedWithSocial('Google')}
              {socialLinkWithAccountLink(() => signIn('google'))}
            </Fragment>
          )}
        </ListItem>
        <Divider className={classes.dividerStyle} />
        <ListItem>
          <ListItemAvatar>
            <Image src='/static/facebook.svg' alt='facebook-account' width='35' height='35' />
          </ListItemAvatar>
          {stateUser.facebook_account_id != null ? (
            <Fragment>
              {socialLinkedInfo(stateUser.facebook_account_name, stateUser.facebook_account_email)}
              {removeSocialLinked('facebook')}
            </Fragment>
          ) : (
            <Fragment>
              {accountNotLinkedWithSocial('Facebook')}
              {socialLinkWithAccountLink(() => signIn('facebook'))}
            </Fragment>
          )}
        </ListItem>
        <Divider className={classes.dividerStyle} />
        <ListItem>
          <ListItemAvatar>
            <Image src='/static/apple.svg' alt='apple-account' width='35' height='35' />
          </ListItemAvatar>
          {stateUser.apple_account_id != null ? (
            <Fragment>
              {socialLinkedInfo(stateUser.apple_account_name, stateUser.apple_account_email)}
              {removeSocialLinked('apple')}
            </Fragment>
          ) : (
            <Fragment>
              {accountNotLinkedWithSocial('Apple')}
              {socialLinkWithAccountLink(linkAppleId)}
            </Fragment>
          )}
        </ListItem>
      </List>
      <Modal open={removeConnectModal} onEscapeKeyDown={closePromptModal}>
        {modalUnlinkSocial}
      </Modal>
    </Paper>
  );
}

export default withStyles(commonStyles)(ConnectSocialAccount);
