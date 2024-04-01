export interface TokenInfo {
  user_name: string;
  scope: string[];
  domain?: string;
  active: boolean;
  exp: number;
  authorities: string[];
  jti?: string;
  client_id: string;
  error?: string;
}

export interface AccountChangePhoneNumberRequest {
  new_phone_number: string;
  current_password: string;
}
export interface AccountChangePasswordRequest {
  phone_number?: string;
  country_code?: string;
  email?: string;
  loginIdentity: LoginIdentity;
  new_password: string;
  current_password: string;
  access_token?: string;
  lang?: string;
}

export class UpdateProfileRequest {
  full_name: string;
  phone_number: string;
  email: string;
  gender: string;
  dob: string;
  district_id: number;
  city_id: number;
  ward_id: number;
  address: string;
  language: string;
  access_token: string;
}

export interface AccountResponse {
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
}

export interface TenantResponse {
  id: number;
  service_domain: string;
  client_id: string;
  domain: string;
  name: string;
  visible: boolean;
  last_access_date: null | Date;
  full_url: string;
}

export interface AccountInfo {
  account_details: User;
}

export interface SuccessResponse {
  success: boolean;
}
export type User = {
  full_name: string;
  email: string;
  phone_number: string;
  country_code: string;
  address: string;
  gender: 'other' | 'male' | 'female';
  dob: Date;
  district_id: number;
  city_id: number;
  country_id: number;
  ward_id: number;
  intl_phone_number: string;
  is_active: boolean;
  tenants: TenantsResponse;
  global_session_id: string;
  has_password: boolean;
  apple_account_id: string;
  facebook_account_id: string;
  google_account_id: string;
  apple_account_name: string;
  facebook_account_name: string;
  google_account_name: string;
  apple_account_email: string;
  facebook_account_email: string;
  google_account_email: string;
  login_identity: LoginIdentity;
  language: 'vi' | 'th' | 'en';
};

export enum LoginIdentity {
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
}

export type TenantsResponse = Array<TenantResponse>;

export interface ConnectSocialAccountRequest {
  access_token: string | null;
  provider: 'facebook' | 'google';
  id: string;
  email: string;
  name: string;
}

export interface RemoveSocialConnectRequest {
  access_token: string;
  social_account_provider: string;
}

export interface UpdateVisibleTenant {
  access_token?: string;
  tenant_id: number;
  visible: boolean;
}

export type SapoCountry = {
  id: number;
  code: string;
  name: string;
  internationalName: string;
  note: string;
};
export type SapoCountries = {
  countries: SapoCountry[];
};

export type SapoCity = {
  id: number;
  name: string;
  nameTransliteration: string;
  alias: string;
  isActive: boolean;
  isBigCity: boolean;
  regionalId: string;
  countryId: number;
  number: number;
};

export type SapoCities = {
  cities: SapoCity[];
};
export type SapoDistrict = {
  id: number;
  cityId: number;
  name: string;
  nameTransliteration: string;
  number: number;
  alias: string;
  countryId: number;
};
export type SapoDistricts = {
  district: SapoDistrict[];
};
export type SapoCityDistrict = {
  id: string;
  city: SapoCity;
  district: SapoDistrict;
  name: string;
};
export type SapoCityDistricts = {
  city_districts: SapoCityDistrict[];
};
export type SapoWard = {
  id: number;
  name: string;
  nameTransliteration: string;
  zipCode: string;
  districtId: number;
  cityId: number;
};
export type SapoWards = {
  wards: SapoWard[];
};

export interface Tenant {
  domain_name: string | false;
  domain_url: string | false;
  package_name: string | false;
  package_description: string | false;
  start_date: string | false;
  end_date: string | false | null;
  customer_id: number | false;
  customer_name: string | false;
  customer_address: string | false;
  customer_phone: string | false;
  customer_email: string | false;
  customer_identity_card: string | false;
  customer_vat: string | false;
  subscription_id: number | false;
  tag: string | false;
  action: string | false;
}

export interface Store {
  domain_url: string;
  package_name: string;
  package_description: string;
  start_date: string;
  end_date: string | null;
  customer_id: number;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  customer_email: string;
  customer_identity_card: string;
  customer_vat: string;
  subscription_id: number;
  product_category_id: number;
  action_type: string;
  tag: boolean | string;
  domain_name: string;
  is_trial: boolean;
}

export interface OtherSubscription {
  location_addons: any[];
  channel_addons: any[];
  storage_addons: any[];
}

export interface GetUserWithDomain {
  domain_name: string;
  user_name: string;
  user_fb_link: boolean | string;
  user_zalo_link: boolean | string;
  user_phone: string;
  renewal_sale_name: string;
  renewal_sale_fb_link: boolean | string;
  renewal_sale_zalo_link: boolean | string;
  renewal_sale_phone: boolean | string;
}

export interface GetSaleOrderTemplate {
  sale_order_template_id: number;
  order_type: string;
  category_name: string;
  use_period: number;
  priority: number;
  sale_order_template_type: string;
  product_name: string;
  product_unit_price: number;
  product_lst_price: number;
}

export interface SaleOrderTemplateLine {
  is_refund_line: boolean;
  is_reward_line: boolean;
  name: string;
  price_subtotal_untaxed: number;
  z_reward_from_line_id: number;
  z_sale_order_temp_core_product: boolean;
  z_total_refund_amount: number;
  price_tax: number;
  z_promotion_amount_applied: number;
  price_total: number;
  price_unit: number;
  product_uom: string;
  product_uom_qty: number;
}

export interface SaleOrderTemplate {
  sale_order_template_id: number;
  sale_order_template_order_type: string;
  promo_program_template_id: boolean;
  promo_program_template_description: boolean;
  sale_order_temp_total_untaxed: number;
  sale_order_temp_tax: number;
  sale_order_temp_discount: number;
  sale_order_temp_total: number;
  sale_order_temp_line: SaleOrderTemplateLine[];
}

export interface RequestPaymentBody {
  subscription_id: number;
  sale_order_template_id: number;
  order_type: string;
  amount: number;
}

export interface ListStore {
  [key: string]: Store;
}

export * from './contract/model';
