import { ICategory } from './ICategory';
import { ISubcategory } from './ISubcategory';
import { IBrand } from './IBrand';
import { IMaterial } from './IMaterial';
import { IColor } from './IColor';

export interface IFurniture {
  id: string;
  name: string;
  brand: IBrand;
  description: string;
  materials: IMaterial[];
  color: IColor[];
  body: string;
  price: number;
  discount: number;
  photos: string[];
  created: string;
  updated: string;
  weight: string;
  in_stock: boolean;
  category: ICategory;
  subcategory: ISubcategory;
  deleted?: string | null;
  sellerType: string; //todo Enum
}
