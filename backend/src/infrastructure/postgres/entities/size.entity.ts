import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SizeID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.SIZE)
export class SizeEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: SizeID;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column('int')
  length: number;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToOne(() => SizeEntity, (entity) => entity.furniture)
  @JoinColumn()
  furniture?: FurnitureEntity;
}
