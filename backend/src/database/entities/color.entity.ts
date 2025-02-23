import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ColorID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.COLOR)
export class ColorEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ColorID;

  @Column('text')
  color_name: string;

  @ManyToMany(() => FurnitureEntity, (entity) => entity.color)
  furniture?: FurnitureEntity[];
}
