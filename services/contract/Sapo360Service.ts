import { Contract } from './model';
import axios, { AxiosResponse } from 'axios';
import { AXIOS_CONFIG } from '../axios_config';
import {
  GetSaleOrderTemplate,
  GetUserWithDomain,
  ListStore,
  OtherSubscription,
  RequestPaymentBody,
  SaleOrderTemplate,
} from 'services/Model';

export class Sapo360Service {
  public static async getSaleOrders(
    phone?: string,
    email?: string,
  ): Promise<AxiosResponse<{ 'sale.order': Array<Contract> }>> {
    let headers: { phone?: string; email?: string } = {};
    if (phone !== undefined) {
      headers.phone = phone;
    }
    if (email) {
      headers.email = email;
    }

    let result = null;
    try {
      console.time(`call ${process.env.SAPO360_BASE_URL}/api_partner/get_invoice`);
      result = await axios.get('/api_partner/get_invoice', {
        ...AXIOS_CONFIG,
        headers: {
          'Sapo360-Access-Token': process.env.SAPO360_ACCESS_TOKEN,
          ...headers,
        },
        baseURL: process.env.SAPO360_BASE_URL,
        auth: undefined,
        maxContentLength: undefined,
      });
    } catch (e) {
      console.timeEnd(`call ${process.env.SAPO360_BASE_URL}/api_partner/get_invoice`);
      console.warn(JSON.stringify(e));
      return null;
    }
    console.timeEnd(`call ${process.env.SAPO360_BASE_URL}/api_partner/get_invoice`);
    return result;
  }
  public static async getSaleOrder(id: string): Promise<Contract> {
    console.time(`call ${process.env.SAPO360_BASE_URL}/api_core/sale_order?id=` + id);
    const response = await axios.get('/api_core/sale_order?id=' + id, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': process.env.SAPO360_ACCESS_TOKEN,
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });
    console.timeEnd(`call ${process.env.SAPO360_BASE_URL}/api_core/sale_order?id=` + id);
    return response.data['sale.order'] ? response.data['sale.order'][0] : {};
  }

  public static async getStores(domain: string): Promise<ListStore> {
    const response = await axios.get('/api/service_management_detail/?domain=' + domain, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async getOtherSubscription(id: string): Promise<OtherSubscription> {
    const response = await axios.get('/api/sale_subscription/get_other_subscription/' + id, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async getUserWithDomain(domain: string): Promise<GetUserWithDomain> {
    const response = await axios.get('/api/res_users/get_user_with_domain/' + domain, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async getSaleOrderTemplate(category: string): Promise<GetSaleOrderTemplate[]> {
    const response = await axios.get('api/sale_order_template_switch_definition/get_sale_order_template/' + category, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async getRenewalSO(
    subscriptionId: number,
    saleOrderTemplateIds: string,
    promoId: number,
  ): Promise<SaleOrderTemplate[]> {
    const queryParams = new URLSearchParams({
      subscription_id: subscriptionId.toString(),
      sale_order_template_ids: saleOrderTemplateIds,
      promo_id: promoId.toString(),
    });

    console.log('Get', `api/sale_order/get_renewal_so_with_promo?${queryParams.toString()}`);
    const response = await axios.get(`api/sale_order/get_renewal_so_with_promo?${queryParams.toString()}`, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async getSwitchSO(
    subscriptionId: number,
    saleOrderTemplateIds: string,
    promoId: number,
  ): Promise<SaleOrderTemplate[]> {
    const queryParams = new URLSearchParams({
      subscription_id: subscriptionId.toString(),
      sale_order_template_ids: saleOrderTemplateIds,
      promo_id: promoId.toString(),
    });

    const response = await axios.get(`api/sale_order/get_switch_so_with_promo?${queryParams.toString()}`, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async createRequestPaymentWithQR(data: RequestPaymentBody): Promise<any> {
    const response = await axios.post('api/sale_order/create_request_payment_with_qr', data, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
        'Content-Type': 'application/json',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data;
  }

  public static async getPurchaseHistory(): Promise<any> {
    const response = await axios.get(`api/sso/sso_payment/search`, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }

  public static async cancelPayment(id: string): Promise<any> {
    const response = await axios.get(`api/banking_service_log/action_cancel/${id}`, {
      ...AXIOS_CONFIG,
      headers: {
        'Sapo360-Access-Token': 'access_token_7fb2fcd5b8872f7f87d00a16accc7b96e4864843',
      },
      baseURL: process.env.SAPO360_BASE_URL,
      auth: undefined,
      maxContentLength: undefined,
    });

    return response.data.data;
  }
}
