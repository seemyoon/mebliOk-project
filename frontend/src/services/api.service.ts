import axios from 'axios';
import { baseUrl, urlBuilder } from '../constants/url';
import { IShoppingInfo } from '../interfaces/IShoppingInfo';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {},
});

axiosInstance.interceptors.request.use(request => {
  request.headers.set('Content-Type', 'application/json');
  return request;
});

const apiService = {
  getShippingInfo: async (): Promise<IShoppingInfo> => {
    const res = await axiosInstance.get<IShoppingInfo>(urlBuilder.extraInfo.shippingInfo());
    return res.data;
  },
};

export { apiService };