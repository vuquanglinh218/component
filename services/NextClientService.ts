import axios, {AxiosResponse} from "axios";
import {
    AccountChangePasswordRequest,
    AccountResponse, ConnectSocialAccountRequest, Contract, SapoCityDistricts, SapoWards,
    SuccessResponse, TenantResponse,
    UpdateProfileRequest, UpdateVisibleTenant, User
} from "./Model";
import {ContractListRow} from "../components/ContractsList/components/TabTable";
import {FreshDeskRequest, FreshDeskResponse} from './freshdesk/FreshDeskService';
import * as fs from 'fs';
import * as util from 'util'
export class NextClientService {
    public static async updatePassword(req: {update_password: AccountChangePasswordRequest}): Promise<AxiosResponse<AccountResponse>> {
        return await axios.post('/api/update_password', req);
    }
    public static async connectSocialAccount(req: {connect_social_account: ConnectSocialAccountRequest}): Promise<AxiosResponse<SuccessResponse>> {
        return await axios.post('/api/connect_social_account_with_sdk', req);
    }
    public static async updateProfile(req: {account: UpdateProfileRequest}): Promise<AxiosResponse<SuccessResponse>> {
        return await axios.post('/api/update_profile', req);
    }
    public static async getSapoCityDistricts(countryId: number): Promise<AxiosResponse<SapoCityDistricts>> {
        return await axios.get(`/api/sapo_location?type=city_district&countryId=${countryId}`);
    }
    public static async getSapoWard(countryId: number, cityId: number, districtId: number): Promise<AxiosResponse<SapoWards>> {
        return await axios.get(`/api/sapo_location?type=ward&countryId=${countryId}&cityId=${cityId}&districtId=${districtId}`);
    }

    public static async removeSocialConnect(provider): Promise<AxiosResponse<AccountResponse>> {
        return await axios.delete('/api/remove_social_connect', {
            params: {
                provider
            }
        });
    }
    public static async logoutWithMobileApp(): Promise<AxiosResponse<{redirect: string}>> {
        return await axios.post('/api/logout?isMobileApp=true');
    }
    public static async getAppSource() {
        return await axios.get('/api/app_source');
    }

    public static async getAccount(): Promise<AxiosResponse<User>> {
        return await axios.get('/api/account');
    }

    public static async getContractsList(status): Promise<AxiosResponse<Array<ContractListRow>>> {
        return await axios.get('/api/get_contracts', {
            params: {
                status
            }
        });
    }
    public static async getContractsDetail(id): Promise<AxiosResponse<Contract>> {
        return await axios.get('/api/get_contracts/' + id);
    }
    public static async setVisibleTenant(req: {set_visible_tenant: UpdateVisibleTenant}): Promise<AxiosResponse<TenantResponse>> {
        return await axios.put('/api/set_visible_tenant', req);
    }

    public static async sendSupportTicket(requestData: FreshDeskRequest, files: File[]): Promise<AxiosResponse<FreshDeskResponse>>  {
        let data: FreshDeskRequest | FormData = requestData;
        if (files && files.length) {
            const formData = new FormData()
            for (const prop in requestData) {
                if (requestData[prop] instanceof Object) {
                    for (const t_props in requestData[prop]) {
                        formData.append(`${prop}[${t_props}]`, requestData[prop][t_props])
                    }
                } else formData.append(prop, requestData[prop])
            }
            files.forEach(file => {
                formData.append("attachments[]", file)
            })
            data = formData
        }

        return await axios.post('/api/send_ticket', data, {
            maxContentLength: 10000000,
        });
    }
    public static async logout(): Promise<AxiosResponse<{redirect: string}>> {
        return await axios.post('/api/logout');
    }
}
