import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BrandID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.BRAND)
export class BrandEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: BrandID;

  @Column('text')
  brand_name: string;

  @OneToMany(() => FurnitureEntity, (entity) => entity.brand)
  furniture?: FurnitureEntity[];
}
