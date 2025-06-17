import { urlBuilder } from '../constants/url';
import { IShippingInfo } from '../interfaces/IShippingInfo';
import { axiosInstance } from './api.service';

const shippingInfoService = {
  getShippingInfo: async (): Promise<IShippingInfo> => {
    const res = await axiosInstance.get<IShippingInfo>(urlBuilder.extraInfo.shippingInfo());
    return res.data;
  },
};

export { shippingInfoService };