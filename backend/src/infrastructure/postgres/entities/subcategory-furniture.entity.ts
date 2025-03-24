import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CategoryFurnitureID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { CategoryFurnitureEntity } from './category-furniture.entity';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.SUB_CATEGORY_FURNITURE)
export class SubCategoryFurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: SubCategoryFurnitureID;

  @Column('text')
  title: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column()
  category_id: CategoryFurnitureID;
  @ManyToOne(
    () => CategoryFurnitureEntity,
    (entity) => entity.subCategoryFurniture,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'category_id' })
  category?: CategoryFurnitureEntity;

  @OneToMany(() => FurnitureEntity, (entity) => entity.subcategory)
  furniture?: FurnitureEntity[];
}
