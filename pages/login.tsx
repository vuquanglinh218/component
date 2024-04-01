import React from 'react';
import withSession from '../lib/session';

const SAPO_ACCOUNTS_BASE_URL = process.env.SAPO_ACCOUNTS_BASE_URL;
const BASE_URL = process.env.BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;

const LogonPage = () => {};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const authorizeReq = new URL('/oauth/authorize', SAPO_ACCOUNTS_BASE_URL);
  authorizeReq.searchParams.append('client_id', CLIENT_ID);
  authorizeReq.searchParams.append('redirect_uri', `${BASE_URL}/api/auth/callback`);
  const url = new URL('https://' + req.headers.host + '/' + req.url);
  const store = url.searchParams.get('store');
  const appSource = url.searchParams.get('appSource');
  const state = {};
  if (store && store !== 'null') {
    state['store'] = store;
  }
  if (appSource && appSource !== 'null') {
    state['appSource'] = appSource;
  }
  authorizeReq.searchParams.append('state', JSON.stringify(state));
  authorizeReq.searchParams.append('scope', 'profile');
  authorizeReq.searchParams.append('response_type', 'code');

  res.setHeader('location', authorizeReq.href);
  res.statusCode = 302;
  res.end();
  return {
    props: {},
  };
});

export default LogonPage;
