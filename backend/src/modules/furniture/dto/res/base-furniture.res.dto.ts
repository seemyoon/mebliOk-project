import { FurnitureID } from '../../../../common/types/entity-ids.type';
import { BrandResDto } from '../../../brand/dto/res/brand.res.dto';
import { CategoryFurnitureResDto } from '../../../categories/dto/res/category-furniture.res.dto';
import { SubCategoryFurnitureResDto } from '../../../categories/dto/res/subcategory-furniture.res.dto';
import { ColorResDto } from '../../../color/dto/res/color.res.dto';
import { MaterialResDto } from '../../../material/dto/res/material.res.dto';
import { SellerEnum } from '../../../user/enum/seller.enum';
import { SizeResDto } from './size.res.dto';

export class FurnitureBaseResDto {
  id: FurnitureID;
  name: string;
  brand: BrandResDto;
  description?: string;
  photos?: string[] | null;
  materials: MaterialResDto[];
  body?: string;
  weight: string;
  in_stock: boolean;
  isSale: boolean;
  size: SizeResDto;
  category: CategoryFurnitureResDto;
  subcategory: SubCategoryFurnitureResDto;
  color: ColorResDto[];
  price: number;
  discount?: number | 0;
  created: Date;
  updated: Date;
  deleted: Date;
  sellerType?: SellerEnum;
}
