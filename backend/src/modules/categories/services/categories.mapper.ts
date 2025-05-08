import { Injectable } from '@nestjs/common';

import { CategoryFurnitureEntity } from '../../../infrastructure/postgres/entities/category-furniture.entity';
import { SubCategoryFurnitureEntity } from '../../../infrastructure/postgres/entities/subcategory-furniture.entity';
import { ListCategoriesFurnitureQueryDto } from '../dto/req/list-categories-furniture.query.dto';
import { ListSubCategoriesFurnitureQueryDto } from '../dto/req/list-subcategories-furniture.query.dto';
import { CategoriesFurnitureListResDto } from '../dto/res/categories-list.res.dto';
import { CategoryFurnitureResDto } from '../dto/res/category-furniture.res.dto';
import { SubCategoriesFurnitureListResDto } from '../dto/res/subcategories-list.res.dto';
import { SubCategoryFurnitureResDto } from '../dto/res/subcategory-furniture.res.dto';

@Injectable()
export class CategoriesMapper {
  public static toResCategoryFurnitureDto(
    data: CategoryFurnitureEntity,
  ): CategoryFurnitureResDto {
    return {
      id: data?.id,
      title: data?.title,
      photo: data?.photo,
    };
  }

  public static toResCategoryFurnitureList(
    data: CategoryFurnitureEntity[],
    total: number,
    query: ListCategoriesFurnitureQueryDto,
  ): CategoriesFurnitureListResDto {
    return {
      data: data.map(this.toResCategoryFurnitureDto),
      total,
      ...query,
    };
  }

  public static toResSubCategoryFurnitureDto(
    data: SubCategoryFurnitureEntity,
  ): SubCategoryFurnitureResDto {
    return {
      id: data?.id,
      title: data?.title,
      photo: data?.photo,
    };
  }

  public static toResSubCategoryFurnitureList(
    data: SubCategoryFurnitureEntity[],
    total: number,
    query: ListSubCategoriesFurnitureQueryDto,
  ): SubCategoriesFurnitureListResDto {
    return {
      data: data.map(this.toResSubCategoryFurnitureDto),
      total,
      ...query,
    };
  }
}
