import http from '../../../utils/http';
import withSession from '../../../lib/session';
import getConfig from 'next/config';
import { AppSource, getAppSource } from '../../../utils/AppSource';

const API_KEY = process.env.API_KEY;

const {
  publicRuntimeConfig: { tokenUrl, profileOAuthCallback },
} = getConfig();

type SapoAccountsAccessTokenResBody = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
};

async function handler(req, res) {
  const {
    query: { code, state },
  } = req;

  const tokenExchangeForm = new URLSearchParams();
  const params = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: profileOAuthCallback,
  };
  Object.keys(params).forEach((key) => {
    tokenExchangeForm.append(key, params[key]);
  });
  const {
    parsedBody: { access_token, expires_in },
  } = await http<SapoAccountsAccessTokenResBody>(tokenUrl, {
    method: 'POST',
    body: tokenExchangeForm,
    headers: {
      Authorization: `Basic ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  req.session.set('account', {
    accessToken: access_token,
    expiresIn: expires_in,
  });

  await req.session.save();
  const objState = state ? JSON.parse(state) : null;
  if (objState && AppSource[objState['appSource']])
    return res.redirect(`/m?appSource=${objState['appSource']}&store=${objState['store']}`);
  return res.redirect('/accounts');
}

export default withSession(handler);
