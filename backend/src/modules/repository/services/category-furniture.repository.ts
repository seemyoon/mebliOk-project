import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CategoryFurnitureEntity } from '../../../database/entities/category-furniture.entity';

@Injectable()
export class CategoryFurnitureRepository extends Repository<CategoryFurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CategoryFurnitureEntity, dataSource.manager);
  }
}
