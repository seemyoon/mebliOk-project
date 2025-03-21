import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CustomerInfoID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';

@Entity(TableNameEnum.CUSTOMER_INFO)
export class CustomerInfoEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CustomerInfoID;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { unique: true, nullable: true })
  phoneNumber: string;

  @Column('text', { nullable: true })
  avatar?: string;
}
