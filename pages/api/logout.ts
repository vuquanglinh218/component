import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';
import withSession from '../../lib/session';
import getConfig from 'next/config';
import { AppSource, getAppSource } from '../../utils/AppSource';
import { Authentication } from 'utils/Authentication';

let {
  publicRuntimeConfig: { sapoVnHomePage, sapoGoHomePage },
} = getConfig();

async function handler(req, res) {
  if (req.method === 'POST') {
    const { isMobileApp } = req.query;
    const globalSessionId = req.session.get('globalSessionId');

    let redirectUrl = sapoVnHomePage;

    if (!isMobileApp) {
      const principal = await Authentication.getAccessToken(req, res);
      const userDataEndpoint = await SapoAccountsService.userInfo(principal.accessToken);
      if (userDataEndpoint.data.account_details.language === 'th') {
        redirectUrl = `${sapoGoHomePage}/th`;
      }
    }

    await SapoAccountsService.logout(globalSessionId);
    await req.session.destroy();
    if (isMobileApp) {
      const appSource = getAppSource(req, res);
      res.send({ redirect: AppSource[appSource] + 'logout' });
      res.end();
      return;
    }
    res.send({ redirect: redirectUrl });
    res.end();
    return;
  }
  res.status(405);
  res.end();
}

export default withSession(handler);
