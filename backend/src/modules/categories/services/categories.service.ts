import { ConflictException, Injectable } from '@nestjs/common';

import {
  CategoryFurnitureID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { CategoryFurnitureEntity } from '../../../database/entities/category-furniture.entity';
import { SubCategoryFurnitureEntity } from '../../../database/entities/subcategory-furniture.entity';
import { CategoryFurnitureRepository } from '../../repository/services/category-furniture.repository';
import { SubCategoryFurnitureRepository } from '../../repository/services/subcategory-furniture.repository';
import { CategoryReqDto } from '../dto/req/category.req.dto';
import { ListCategoriesFurnitureQueryDto } from '../dto/req/list-categories-furniture.query.dto';
import { ListSubCategoriesFurnitureQueryDto } from '../dto/req/list-subcategories-furniture.query.dto';
import { SubCategoryReqDto } from '../dto/req/subcategory.req.dto';
import { UpdateCategoryFurnitureReqDto } from '../dto/req/update-category.req.dto';
import { UpdateSubCategoryFurnitureReqDto } from '../dto/req/update-subcategory.req.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryFurnitureRepository: CategoryFurnitureRepository,
    private readonly subCategoryFurnitureRepository: SubCategoryFurnitureRepository,
  ) {}

  public async getCategoriesFurniture(
    query: ListCategoriesFurnitureQueryDto,
  ): Promise<[CategoryFurnitureEntity[], number]> {
    return await this.categoryFurnitureRepository.findAll(query);
  }

  public async getSubCategoriesFurniture(
    query: ListSubCategoriesFurnitureQueryDto,
    categoryFurnitureId: CategoryFurnitureID,
  ): Promise<[SubCategoryFurnitureEntity[], number]> {
    return await this.subCategoryFurnitureRepository.findAll(
      categoryFurnitureId,
      query,
    );
  }

  public async createCategoryFurniture(
    dto: CategoryReqDto,
  ): Promise<CategoryFurnitureEntity> {
    const title = await this.categoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("Category's title is already exist");
    }

    return await this.categoryFurnitureRepository.save(
      this.categoryFurnitureRepository.create({
        title: dto.title,
      }),
    );
  }

  public async createSubCategoryFurniture(
    dto: SubCategoryReqDto,
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const title = await this.subCategoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("SubCategory's title is already exist");
    }

    return await this.subCategoryFurnitureRepository.save(
      this.subCategoryFurnitureRepository.create({
        title: dto.title,
        category_id: categoryFurnitureID,
      }),
    );
  }

  public async editCategoryFurniture(
    dto: UpdateCategoryFurnitureReqDto,
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<CategoryFurnitureEntity> {
    const category =
      await this.categoryFurnitureRepository.findByCategoryId(
        categoryFurnitureID,
      );
    if (!category) {
      throw new ConflictException('Category not found');
    }
    const title = await this.categoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("Category's title is already exist");
    }

    category.title = dto.title;

    return await this.categoryFurnitureRepository.save(category);
  }

  public async editSubCategoryFurniture(
    dto: UpdateSubCategoryFurnitureReqDto,
    subCategoryFurnitureID: SubCategoryFurnitureID,
    categoryFurnitureID?: CategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const subCategory =
      await this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      );
    if (!subCategory) {
      throw new ConflictException('SubCategory not found');
    }
    const title = await this.subCategoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("SubCategory's title is already exist");
    }

    subCategory.title = dto.title;
    if (categoryFurnitureID) {
      subCategory.category_id = categoryFurnitureID;
    }

    return await this.subCategoryFurnitureRepository.save(subCategory);
  }

  public async getCategoryFurniture(
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<CategoryFurnitureEntity> {
    const category =
      await this.categoryFurnitureRepository.findByCategoryId(
        categoryFurnitureID,
      );
    if (!category) {
      throw new ConflictException('Category not found');
    }
    return category;
  }

  public async getSubCategoryFurniture(
    subCategoryFurnitureID: SubCategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const subCategory =
      await this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      );
    if (!subCategory) {
      throw new ConflictException('SubCategory not found');
    }
    return subCategory;
  }
}
