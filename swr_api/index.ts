import useSWR from 'swr';
import axios from 'axios';
import { GetSaleOrderTemplate } from 'services/Model';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useGetListStore(domain: string[]) {
  const { data, error, isLoading } = useSWR(`/api/get_stores?domain=${domain.join(',')}`, fetcher);

  return {
    dataListStore: data,
    errorListStore: error,
    isLoadingListStore: isLoading,
  };
}

export function useGetStore(domain: string) {
  const { data, error, isLoading } = useSWR(`/api/get_stores?domain=${domain}`, fetcher);

  return {
    dataStore: data && data[domain],
    errorStore: error,
    isLoadingStore: isLoading,
  };
}

export function useGetOtherSubscription(subId?: string) {
  const { data, error, isLoading } = useSWR(subId ? `/api/get_other_subscription/${subId}` : null, fetcher);

  return {
    dataOtherSubscription: data,
    errorOtherSubscription: error,
    isLoadingSubscription: isLoading,
  };
}

export function useGetUserWithDomain(domain?: string) {
  const { data, error, isLoading } = useSWR(domain ? `/api/get_user_with_domain/${domain}` : null, fetcher, {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  return {
    dataUserWithDomain: data,
    errorUserWithDomain: error,
    isLoadingUserWithDomain: isLoading,
  };
}

export function useSaleOrderTemplate(category?: string) {
  const { data, error, isLoading } = useSWR(category ? `/api/get_sale_order_template/${category}` : null, fetcher);

  return {
    dataSaleOrderTemplate: data,
    errorSaleOrderTemplate: error,
    isLoadingSaleOrderTemplate: isLoading,
  };
}

export function useGetRenewalSO(params?: { subscriptionId: number; saleOrderTemplateIds: string; promoId?: number }) {
  const queryParams = new URLSearchParams({
    subscription_id: params?.subscriptionId?.toString(),
    sale_order_template_ids: params?.saleOrderTemplateIds,
    promo_id: params?.promoId?.toString(),
  });
  const { data, error, isLoading } = useSWR(params ? `/api/get_renewal_so?${queryParams.toString()}` : null, fetcher);

  return {
    dataGetRenewalSO: data,
    errorGetRenewalSO: error,
    isLoadingGetRenewalSO: isLoading,
  };
}

export function useGetSwitchSO(params?: { subscriptionId: number; saleOrderTemplateIds: string; promoId?: number }) {
  const queryParams = new URLSearchParams({
    subscription_id: params?.subscriptionId?.toString(),
    sale_order_template_ids: params?.saleOrderTemplateIds,
    promo_id: params?.promoId?.toString(),
  });
  const { data, error, isLoading } = useSWR(params ? `/api/get_switch_so?${queryParams.toString()}` : null, fetcher);

  return {
    dataGetSwitchSO: data,
    errorGetSwitchSO: error,
    isLoadingGetSwitchSO: isLoading,
  };
}

export function useGetPaymentInfo(
  order_type?: string,
  params?: { subscriptionId: number; saleOrderTemplateIds: string; promoId?: number },
) {
  const { dataGetRenewalSO, isLoadingGetRenewalSO, errorGetRenewalSO } = useGetRenewalSO(
    order_type === 'gh' ? params : undefined,
  );

  const { dataGetSwitchSO, isLoadingGetSwitchSO, errorGetSwitchSO } = useGetSwitchSO(
    order_type === 'nc' ? params : undefined,
  );

  switch (order_type) {
    case 'gh':
      return {
        dataPaymentInfo: dataGetRenewalSO,
        isLoadingPaymentInfo: isLoadingGetRenewalSO,
        errorPaymentInfo: errorGetRenewalSO,
      };
    case 'nc':
      return {
        dataPaymentInfo: dataGetSwitchSO,
        isLoadingPaymentInfo: isLoadingGetSwitchSO,
        errorPaymentInfo: errorGetSwitchSO,
      };
    default:
      return {
        dataPaymentInfo: undefined,
        isLoadingPaymentInfo: undefined,
        errorPaymentInfo: undefined,
      };
  }
}
