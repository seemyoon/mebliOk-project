import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FurnitureID } from '../../common/types/entity-ids.type';
import { SellerEnum } from '../../modules/user/enum/seller.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { SizeEntity } from './size.entity';

@Entity(TableNameEnum.FURNITURE)
export class FurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: FurnitureID;

  @Column('text', { default: [] })
  photos?: string[];

  @Column('text')
  brand: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column({ type: 'enum', enum: SellerEnum, nullable: true })
  sellerType?: SellerEnum;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column('text', { default: [] })
  materials: string[];

  @Column('text', { default: [] })
  color: string[];

  @Column('boolean', { default: false })
  is_discount: boolean;

  @Column('int', { default: 0 })
  weight: number;

  @Column('boolean', { default: false })
  in_stock: boolean;

  @Column('int', { default: 0 })
  discount: number;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToOne(() => SizeEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  size?: SizeEntity;
}
