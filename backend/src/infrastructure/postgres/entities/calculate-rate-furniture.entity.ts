import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CalculateRateFurnitureID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';

@Entity(TableNameEnum.CALCULATE_RATE_FURNITURE)
export class CalculateRateFurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CalculateRateFurnitureID;

  @Column('int', { default: 70 })
  order_criterion: number;

  @Column('int', { default: 30 })
  view_criterion: number;
}
