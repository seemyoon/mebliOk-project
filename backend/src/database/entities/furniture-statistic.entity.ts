import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  FurnitureID,
  FurnitureStatisticID,
} from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.FURNITURE_STATISTIC)
export class FurnitureStatisticEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: FurnitureStatisticID;

  @Column({ type: 'int' })
  count_views: number;

  @Column()
  furniture_id: FurnitureID;
  @OneToOne(() => FurnitureEntity, (entity) => entity.furniture_statistic, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'furniture_id' })
  furniture?: FurnitureEntity;
}
