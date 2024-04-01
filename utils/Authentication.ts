import axios, { AxiosResponse } from 'axios';
import { AXIOS_CONFIG } from '../services/axios_config';
type CheckTokenResponse = {
  active: boolean;
  user_name: string;
};
export class Authentication {
  static async getAccessToken(req, res) {
    const oauth = req.session.get('account');
    if (!oauth) {
      throw Error('bad oauth');
    }
    let checkToken: AxiosResponse<CheckTokenResponse>;
    try {
      checkToken = await axios.post<CheckTokenResponse, AxiosResponse<CheckTokenResponse>>('oauth/check_token', null, {
        ...AXIOS_CONFIG,
        params: {
          token: oauth.accessToken,
        },
      });
    } catch (e) {
      throw Error('bad oauth');
    }
    if (checkToken.data.active) {
      return oauth;
    }
    throw Error('bad oauth');
  }
}
