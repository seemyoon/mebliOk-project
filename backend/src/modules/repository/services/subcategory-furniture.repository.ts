import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SubCategoryFurnitureEntity } from '../../../database/entities/subcategory-furniture.entity';

@Injectable()
export class SubCategoryFurnitureRepository extends Repository<SubCategoryFurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SubCategoryFurnitureEntity, dataSource.manager);
  }
}
