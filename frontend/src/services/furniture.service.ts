import axios from 'axios';
import { baseUrl, urlBuilder } from '../constants/url';
import {
  IFurniturePaginationModel,
} from '../interfaces/IFurniturePaginationModel';
import { IFurniture } from '../interfaces/IFurniture';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {},
});

axiosInstance.interceptors.request.use(request => {
  request.headers.set('Content-Type', 'application/json');
  return request;
});

const furnitureService = {
  getFurniture: async (): Promise<IFurniture[]> => {
    const response = await axiosInstance.get<IFurniturePaginationModel>(urlBuilder.furniture.getAllFurniture());
    return response.data.data;
  },
};

export { furnitureService };