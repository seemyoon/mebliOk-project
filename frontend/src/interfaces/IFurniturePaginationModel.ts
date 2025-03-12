import { IFurniture } from './IFurniture';

export interface IFurniturePaginationModel{
  data: IFurniture[]
  total: number
  limit: number
  offset: number
  currency: string
}