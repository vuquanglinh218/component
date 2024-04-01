import Cookies from 'cookies';

export const AppSource = {
  APP_ADMIN: 'sapodkt://',
  APP_POS: 'sapopos://',
  APP_SHIPPER: 'saposhipper://',
  APP_WEB: 'sapoweb://',
  POS_APP: 'posapp://',
};

export function getAppSource(req, res): string {
  let appSource;
  let appSourceFromRequest = req.url.indexOf('appSource') > 0 && getQueryVariable(req.url.split('?')[1], 'appSource');
  const cookies = new Cookies(req, res);
  if (appSourceFromRequest) {
    cookies.set('appSource', appSourceFromRequest);
    appSource = appSourceFromRequest;
  } else appSource = cookies.get('appSource') || null;
  return appSource;
}
export function getCurrentStore(req, res): string {
  let store;
  let storeFromRequest = req.url.indexOf('store') > 0 && getQueryVariable(req.url.split('?')[1], 'store');
  const cookies = new Cookies(req, res);
  if (storeFromRequest) {
    cookies.set('store', storeFromRequest);
    store = storeFromRequest;
  } else store = cookies.get('store') || null;
  return store;
}

function getQueryVariable(query, variable) {
  if (!query) return null;
  const vars = query.split('&');
  for (let arrayElement of vars) {
    let pair = arrayElement.split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}
