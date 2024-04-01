import axios, { AxiosResponse } from 'axios';
import { AXIOS_CONFIG } from '../axios_config';
import {
  AccountChangePasswordRequest,
  AccountInfo,
  AccountResponse,
  ConnectSocialAccountRequest,
  RemoveSocialConnectRequest,
  SuccessResponse,
  TenantResponse,
  UpdateProfileRequest,
  UpdateVisibleTenant,
} from '../Model';

export class SapoAccountsService {
  public static async changePassword(req: {
    update_password: AccountChangePasswordRequest;
  }): Promise<AxiosResponse<AccountResponse>> {
    return await axios.post<any>('oauth/update_password?lang=' + req.update_password.lang, req, {
      ...AXIOS_CONFIG,
      headers: {
        Authorization: `Bearer ${req.update_password.access_token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      },
    });
  }
  public static async changeProfile(req: { account: UpdateProfileRequest }): Promise<AxiosResponse<SuccessResponse>> {
    return await axios.post<any>('oauth/update_profile', req, {
      ...AXIOS_CONFIG,
      headers: {
        Authorization: `Bearer ${req.account.access_token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      },
    });
  }

  public static async userInfo(token: string): Promise<AxiosResponse<AccountInfo>> {
    return await axios.post<AccountInfo, AxiosResponse<AccountInfo>>('oauth/user-info', null, {
      ...AXIOS_CONFIG,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      maxContentLength: 1000000,
      params: {
        token: token,
      },
    });
  }

  public static async logout(sessionId: string): Promise<AxiosResponse> {
    return await axios.post('/external-logout', null, {
      ...AXIOS_CONFIG,
      params: {
        sessionId: sessionId,
      },
    });
  }

  public static async connectSocialAccount(req: {
    connect_social_account: ConnectSocialAccountRequest;
  }): Promise<AxiosResponse<SuccessResponse>> {
    return await axios.post('/oauth/connect_social_account', req, {
      ...AXIOS_CONFIG,
    });
  }

  public static async removeSocialConnect(req: {
    remove_social_connect: RemoveSocialConnectRequest;
  }): Promise<AxiosResponse<SuccessResponse>> {
    return await axios.post('/oauth/remove_social_connect', req, {
      ...AXIOS_CONFIG,
    });
  }
  public static async setVisibleTenant(req: {
    set_visible_tenant: UpdateVisibleTenant;
  }): Promise<AxiosResponse<TenantResponse>> {
    return await axios.put('/oauth/set_visible', req, {
      ...AXIOS_CONFIG,
    });
  }
}
