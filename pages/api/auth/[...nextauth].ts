import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(baseUrl + '/api/connect_social_account');
    },
    jwt: async (token, user, account, profile) => {
      if (account) {
        token.provider = account.provider;
      }

      if (profile) {
        token.id = profile.id;
      }

      return Promise.resolve(token);
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: 'UKKYE9DtEX6ppGZK3XbRe2PChPUV2zQsXpCK7zdPKssXTtrAtgqggSmY6YD4wVNJ',
};

export default (req, res) => NextAuth(req, res, options);
