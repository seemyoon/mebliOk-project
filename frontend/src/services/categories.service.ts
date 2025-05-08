import axios from 'axios';
import { baseUrl, urlBuilder } from '../constants/url';
import { ICategory } from '../interfaces/ICategory';
import {
  ICategoryPaginationModel,
} from '../interfaces/ICategoryPaginationModel';


const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {},
});

axiosInstance.interceptors.request.use(request => {
  request.headers.set('Content=Type', 'application/json');
  return request;
});

const categoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    const res = await axiosInstance.get<ICategoryPaginationModel>(urlBuilder.category.getCategories());
    return res.data.data;
  },
};

export { categoryService };