import withSession from '../../lib/session';
import jwt from 'next-auth/jwt';
import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';
import { ConnectSocialAccountRequest } from '../../services/Model';
import { AppSource, getAppSource } from '../../utils/AppSource';

type TokenPayload = {
  name: string;
  email: string;
  picture: string;
  provider: 'facebook' | 'google';
  id: string;
  iat: number;
  exp: number;
};

async function handler(req, res) {
  const token = (await jwt.getToken({
    req,
    secret: 'UKKYE9DtEX6ppGZK3XbRe2PChPUV2zQsXpCK7zdPKssXTtrAtgqggSmY6YD4wVNJ',
  })) as TokenPayload;

  const { accessToken } = req.session.get('account');
  const data: { connect_social_account: ConnectSocialAccountRequest } = {
    connect_social_account: {
      access_token: accessToken,
      provider: token.provider,
      id: token.id,
      email: token.email,
      name: token.name,
    },
  };
  let redirectUrl = '/accounts';
  const appSource = getAppSource(req, res);
  if (appSource && AppSource[appSource]) redirectUrl = '/m/social';
  try {
    const response = await SapoAccountsService.connectSocialAccount(data);
    if (!response.data.success) {
      res.redirect(redirectUrl + '?connection_status=error');
      return;
    }
    res.redirect(redirectUrl + '?connection_status=success');
  } catch (e) {
    res.redirect(redirectUrl + '?connection_status=error');
  }
}

export default withSession(handler);
