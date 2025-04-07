import axios from 'axios';
import { baseUrl, urlBuilder } from '../constants/url';
import { IShippingInfo } from '../interfaces/IShippingInfo';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {},
});

axiosInstance.interceptors.request.use(request => {
  request.headers.set('Content-Type', 'application/json');
  return request;
});

const shippingInfoService = {
  getShippingInfo: async (): Promise<IShippingInfo> => {
    const res = await axiosInstance.get<IShippingInfo>(urlBuilder.extraInfo.shippingInfo());
    return res.data;
  },
};

export { shippingInfoService };