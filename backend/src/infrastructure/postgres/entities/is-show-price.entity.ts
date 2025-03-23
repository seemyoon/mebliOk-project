import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { IsShowPriceID } from '../../../common/types/entity-ids.type';

@Entity(TableNameEnum.IS_SHOW_PRICE)
export class IsShowPriceEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: IsShowPriceID;

  @Column('boolean', { default: true })
  isShowPrice: boolean;
}
