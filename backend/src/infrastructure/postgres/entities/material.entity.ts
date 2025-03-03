import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MaterialID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.MATERIAL)
export class MaterialEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: MaterialID;

  @Column('text')
  material_name: string;

  @ManyToMany(() => FurnitureEntity, (entity) => entity.material)
  furniture?: FurnitureEntity[];
}
