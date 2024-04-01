import { Authentication } from '../utils/Authentication';
import { SapoAccountsService } from '../services/oauth2/SapoAccountsService';
import withSession, { manualApplySession } from '../lib/session';
import { getAppSource, getCurrentStore } from '../utils/AppSource';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { applySession } from 'next-iron-session';

type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

export type InferWithAuthServerSideProps<T extends (...args: any) => Promise<{ props: any }>> =
  AsyncReturnType<T>['props'];

type EmptyProps = {
  props: Record<string, unknown>;
};

export function withAuthServerSideProps<T extends EmptyProps = EmptyProps>() {
  return withSession(async function getMergedServerSideProps({ req, res }): Promise<{ props: T['props'] }> {
    return await getAuthProps(req, res);
  });
}

export async function getAuthServerSideProps(req, res): Promise<{ props: any }> {
  await manualApplySession(req, res);
  return getAuthProps(req, res);
}
export const getAccount = async (req, res) => {
  let userDataEndpoint;
  let principal;
  try {
    principal = await Authentication.getAccessToken(req, res);
    userDataEndpoint = await SapoAccountsService.userInfo(principal.accessToken);
    req.session.set('globalSessionId', userDataEndpoint?.data?.account_details.global_session_id);
    await req.session.save();
    delete userDataEndpoint?.data?.account_details.global_session_id;
  } catch (e) {
    const url = new URL('https://' + req.headers.host + '/' + req.url);
    const store = url.searchParams.get('store');
    const appSource = url.searchParams.get('appSource');
    res.setHeader('location', `/login?store=${store}&appSource=${appSource}`);
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }
  const user = userDataEndpoint?.data?.account_details;
  if (!user.country_id) {
    if (user.country_code === '66') user.country_id = 181;
    else user.country_id = 201;
  }
  if (user.dob && isNaN(new Date(user.dob).getDate())) {
    user.dob = user.dob.replace('+0000', '');
  }
  user.tenants = user.tenants.map((tenant) => {
    if (tenant.last_access_date && isNaN(new Date(tenant.last_access_date).getDate())) {
      tenant.last_access_date = tenant.last_access_date.replace('+0000', '');
    }
    return tenant;
  });
  return user;
};
async function getAuthProps(req, res) {
  const user = await getAccount(req, res);
  return {
    props: {
      user,
      appSource: getAppSource(req, res),
      store: getCurrentStore(req, res),
    },
  };
}

function getCookie(cookies, name) {
  function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  }
  if (!cookies) return null;
  let match = cookies.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

export async function getAuthAndLocaleServerSideProps(locale, req, res): Promise<{ props: any }> {
  const authProps = (await getAuthServerSideProps(req, res)).props;
  let localeProps = authProps.user.language || getCookie(req.headers.cookie, 'lang') || 'vi';
  let transProps = await serverSideTranslations(localeProps);

  return {
    props: {
      ...authProps,
      ...transProps,
    },
  };
}
