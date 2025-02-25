import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BannerID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';

@Entity(TableNameEnum.BANNER)
export class BannerEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: BannerID;

  @Column('text', { nullable: true })
  photo?: string;
}
