import { urlBuilder } from '../constants/url';
import {
  IFurniturePaginationModel,
} from '../interfaces/IFurniturePaginationModel';
import { IFurniture } from '../interfaces/IFurniture';
import { axiosInstance } from './api.service';


const furnitureService = {
  getFurniture: async (): Promise<IFurniture[]> => {
    const response = await axiosInstance.get<IFurniturePaginationModel>(urlBuilder.furniture.getAllFurniture());
    return response.data.data;
  },
};

export { furnitureService };