import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CategoryFurnitureID } from '../../../common/types/entity-ids.type';
import { ListCategoriesFurnitureQueryDto } from '../../../modules/categories/dto/req/list-categories-furniture.query.dto';
import { CategoryFurnitureEntity } from '../../postgres/entities/category-furniture.entity';

@Injectable()
export class CategoryFurnitureRepository extends Repository<CategoryFurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CategoryFurnitureEntity, dataSource.manager);
  }

  public async findAll(
    query: ListCategoriesFurnitureQueryDto,
  ): Promise<[CategoryFurnitureEntity[], number]> {
    const qb = this.createQueryBuilder('category');
    qb.leftJoinAndSelect('category.furniture', 'furniture');
    qb.leftJoinAndSelect(
      'category.subCategoryFurniture',
      'subCategoryFurniture',
    );

    if (query.search) {
      qb.andWhere('category.title ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByCategoryId(
    categoryFurnitureId: CategoryFurnitureID,
  ): Promise<CategoryFurnitureEntity> {
    const qb = this.createQueryBuilder('category');
    qb.leftJoinAndSelect('category.furniture', 'furniture');

    qb.where('category.id = :categoryFurnitureId', { categoryFurnitureId });
    throw new NotFoundException(`id: ${categoryFurnitureId} not found`);
    return await qb.getOne();
  }
}
