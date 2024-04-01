import axios, { AxiosResponse } from 'axios';
import { SapoCities, SapoCityDistricts, SapoDistricts, SapoWards } from './Model';
import LRUCache from 'lru-cache';
import { AXIOS_CONFIG } from './axios_config';

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
  length: function (n, key) {
    return n.length;
  },
  maxAge: 1000 * 60 * 60 * 24,
});
const SAPO_CITIES = (countryId) => {
  return `SAPO_${countryId}_CITIES`;
};
const SAPO_DISTRICTS = (countryId, cityId) => {
  return `SAPO_${countryId}_CITY${cityId}_DISTRICTS`;
};
const SAPO_WARDS = (countryId, cityId, districtId) => {
  return `SAPO_${countryId}_CITY${cityId}_DISTRICT_${districtId}_WARDS`;
};
const SAPO_CITY_DISTRICTS = (countryId) => {
  return `SAPO_${countryId}_CITY_DISTRICT`;
};
export class SapoAccountLocationService {
  public static async GetSapoCities(countryId: number): Promise<SapoCities> {
    if (ssrCache.has(SAPO_CITIES)) {
      return ssrCache.get(SAPO_CITIES);
    }
    const sapoCitiesAxiosResponse = await axios.get<any, AxiosResponse<SapoCities>>(`/countries/${countryId}/cities`, {
      ...AXIOS_CONFIG,
    });
    await ssrCache.set(SAPO_CITIES, sapoCitiesAxiosResponse.data);
    return sapoCitiesAxiosResponse.data;
  }
  public static async GetSapoDistricts(countryId: number, cityId: number): Promise<SapoDistricts> {
    if (ssrCache.has(SAPO_DISTRICTS(countryId, cityId))) {
      return ssrCache.get(SAPO_DISTRICTS(countryId, cityId));
    }
    const sapoDistrictsAxiosResponse = await axios.get<any, AxiosResponse<SapoDistricts>>(
      `/countries/${countryId}/city/${cityId}/districts`,
      {
        ...AXIOS_CONFIG,
      },
    );
    await ssrCache.set(SAPO_DISTRICTS(countryId, cityId), sapoDistrictsAxiosResponse.data);
    return sapoDistrictsAxiosResponse.data;
  }
  public static async GetSapoCityDistricts(countryId: number): Promise<SapoCityDistricts> {
    if (ssrCache.has(SAPO_CITY_DISTRICTS(countryId))) {
      return ssrCache.get(SAPO_CITY_DISTRICTS);
    }
    const sapoCitiesAxiosResponse = await axios.get<any, AxiosResponse<SapoCityDistricts>>(
      `/countries/${countryId}/city_districts`,
      {
        ...AXIOS_CONFIG,
        maxContentLength: 1000000,
      },
    );
    const cityDistrict = sapoCitiesAxiosResponse.data;
    cityDistrict.city_districts.forEach(
      (cityDistrict) => (cityDistrict.id = cityDistrict.city.id + '_' + cityDistrict.district.id),
    );
    await ssrCache.set(SAPO_CITY_DISTRICTS, cityDistrict);
    return sapoCitiesAxiosResponse.data;
  }
  public static async GetSapoWards(countryId: number, cityId: number, districtId: number): Promise<SapoWards> {
    if (ssrCache.has(SAPO_WARDS(countryId, cityId, districtId))) {
      return ssrCache.get(SAPO_WARDS(countryId, cityId, districtId));
    }
    const sapoWardsAxiosResponse = await axios.get<any, AxiosResponse<SapoWards>>(
      `/countries/${countryId}/city/${cityId}/district/${districtId}/wards`,
      {
        ...AXIOS_CONFIG,
        maxContentLength: 1000000,
      },
    );
    await ssrCache.set(SAPO_WARDS(countryId, cityId, districtId), sapoWardsAxiosResponse.data);
    return sapoWardsAxiosResponse.data;
  }
}
