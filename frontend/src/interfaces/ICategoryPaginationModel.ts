import { ICategory } from './ICategory';

export interface ICategoryPaginationModel {
  data: ICategory[];
  total: number;
  limit: number;
  offset: number;
  currency: string;
}