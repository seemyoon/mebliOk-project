import { Injectable } from '@nestjs/common';

import { CategoryFurnitureEntity } from '../../../database/entities/category-furniture.entity';
import { SubCategoryFurnitureEntity } from '../../../database/entities/subcategory-furniture.entity';

@Injectable()
export class CategoriesMapper {
  public static toResCategoryFurnitureDto(data: CategoryFurnitureEntity): any {}

  public static toResSubCategoryFurnitureDto(
    data: SubCategoryFurnitureEntity,
  ): any {}
}
