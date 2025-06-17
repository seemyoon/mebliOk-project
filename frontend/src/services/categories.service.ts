import { urlBuilder } from '../constants/url';
import { ICategory } from '../interfaces/ICategory';
import {
  ICategoryPaginationModel,
} from '../interfaces/ICategoryPaginationModel';
import { axiosInstance } from './api.service';


const categoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    const res = await axiosInstance.get<ICategoryPaginationModel>(urlBuilder.category.getCategories());
    return res.data.data;
  },
};

export { categoryService };