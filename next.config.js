// const { nextI18NextRewrites } = require('next-i18next/rewrites')
const { i18n } = require('./next-i18next.config');

// const localeSubPaths = {
//     vi: 'vi',
//     th: 'th',
//     en: 'en'
// }
const SAPO_ACCOUNTS_BASE_URL = process.env.SAPO_ACCOUNTS_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const POS_CLIENT_ID = process.env.POS_CLIENT_ID;
const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID;
const POS_DOMAIN = process.env.POS_DOMAIN;
const WEB_DOMAIN = process.env.WEB_DOMAIN;
const BASE_URL = process.env.BASE_URL;
const REGISTER_URL = process.env.REGISTER_URL;
const CORE_CLIENT_ID = process.env.CORE_CLIENT_ID;
const DMSServiceURL = process.env.DMS_SERVICE_URL;
const DMSServiceKey = process.env.DMS_SERVICE_KEY;
const DMSServiceType = process.env.DMS_SERVICE_TYPE;
const facebookId = process.env.FACEBOOK_ID;
const sapoVnHomePage = process.env.SAPO_VN_HOME_PAGE;
const sapoGoHomePage = process.env.SAPO_GO_HOME_PAGE;
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const config = {
  i18n,
  // rewrites: async () => [...nextI18NextRewrites(localeSubPaths)],
  publicRuntimeConfig: {
    baseUrl: BASE_URL,
    sapoAccountsBaseUrl: SAPO_ACCOUNTS_BASE_URL,
    clientId: CLIENT_ID,
    scope: 'profile',
    authUrl: `${SAPO_ACCOUNTS_BASE_URL}/oauth/authorize`,
    tokenUrl: `${SAPO_ACCOUNTS_BASE_URL}/oauth/token`,
    profileOAuthCallback: `${BASE_URL}/api/auth/callback`,
    registerUrl: `${REGISTER_URL}/services/signup`,
    coreClientId: CORE_CLIENT_ID,
    coreOAuthCallback: `${REGISTER_URL}/oauth/SapoSSOOauthCallback`,
    homePageUrl: 'https://sapogo.com',
    facebookId,
    DMSServiceURL,
    DMSServiceKey,
    DMSServiceType,
    // localeSubPaths,
    sapoVnHomePage,
    sapoGoHomePage,
    POS_CLIENT_ID,
    WEB_CLIENT_ID,
    POS_DOMAIN,
    WEB_DOMAIN,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/accounts',
        permanent: true,
      },
    ];
  },
  trailingSlash: true,
  // assetPrefix:  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
};
module.exports = withBundleAnalyzer(config);
