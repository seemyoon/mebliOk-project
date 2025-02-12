import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import {
  CategoryFurnitureID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { SubCategoryFurnitureEntity } from '../../../database/entities/subcategory-furniture.entity';
import { ListSubCategoriesFurnitureQueryDto } from '../../categories/dto/req/list-subcategories-furniture.query.dto';

@Injectable()
export class SubCategoryFurnitureRepository extends Repository<SubCategoryFurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SubCategoryFurnitureEntity, dataSource.manager);
  }

  public async findAll(
    categoryFurnitureId: CategoryFurnitureID,
    query: ListSubCategoriesFurnitureQueryDto,
  ): Promise<[SubCategoryFurnitureEntity[], number]> {
    const qb = this.createQueryBuilder('subcategory');
    qb.leftJoinAndSelect('subcategory.furniture', 'furniture');
    qb.leftJoinAndSelect('subcategory.category', 'category');

    if (query.search) {
      qb.andWhere('subcategory.title ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);
    qb.andWhere('category.id = :categoryFurnitureId', { categoryFurnitureId });

    return await qb.getManyAndCount();
  }

  public async findBySubCategoryId(
    subCategoryFurnitureId: SubCategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const qb = this.createQueryBuilder('subcategory');
    qb.leftJoinAndSelect('subcategory.furniture', 'furniture');
    qb.leftJoinAndSelect('subcategory.category', 'category');

    qb.where('subcategory.id = :subCategoryFurnitureId', {
      subCategoryFurnitureId,
    });
    return await qb.getOne();
  }
}
