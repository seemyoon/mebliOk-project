import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryFurnitureID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';
import { SubCategoryFurnitureEntity } from './subcategory-furniture.entity';

@Entity(TableNameEnum.CATEGORY_FURNITURE)
export class CategoryFurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CategoryFurnitureID;

  @Column('text')
  title: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => SubCategoryFurnitureEntity, (entity) => entity.category)
  subCategoryFurniture?: SubCategoryFurnitureEntity[];

  @OneToMany(() => FurnitureEntity, (entity) => entity.category)
  furniture?: FurnitureEntity[];
}
