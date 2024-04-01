import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const BASE_URL = process.env.SAPO_ACCOUNTS_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 100000,
  withCredentials: true,
  responseType: 'json',
  maxContentLength: 1000000,
  validateStatus: (status: number) => status >= 200 && status < 300,
  maxRedirects: 5,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'comma' });
  },
  auth: {
    username: CLIENT_ID,
    password: CLIENT_SECRET,
  },
};
