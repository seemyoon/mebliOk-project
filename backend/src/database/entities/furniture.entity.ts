import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  BrandID,
  CategoryFurnitureID,
  FurnitureID,
  SubCategoryFurnitureID,
} from '../../common/types/entity-ids.type';
import { SellerEnum } from '../../modules/user/enum/seller.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { BrandEntity } from './brand.entity';
import { CategoryFurnitureEntity } from './category-furniture.entity';
import { SizeEntity } from './size.entity';
import { SubCategoryFurnitureEntity } from './subcategory-furniture.entity';
import { QuantityFurnitureInOrderEntity } from './quantity-furniture-in-order.entity';

@Entity(TableNameEnum.FURNITURE)
export class FurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: FurnitureID;

  @Column('json', { default: [] })
  photos?: string[];

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

  @Column('json', { default: [] })
  materials: string[];

  @Column('json', { default: [] })
  color: string[];

  @Column('int', { default: 0 })
  weight: number;

  @Column('boolean', { default: false })
  in_stock: boolean;

  @Column('int', { default: null, nullable: true })
  discount?: number;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToOne(() => SizeEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  size?: SizeEntity;

  @Column()
  brand_id: BrandID;
  @ManyToOne(() => BrandEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @Column()
  category_id: CategoryFurnitureID;
  @ManyToOne(() => CategoryFurnitureEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category?: CategoryFurnitureEntity;

  @Column({ nullable: true })
  subcategory_id: SubCategoryFurnitureID;
  @ManyToOne(() => SubCategoryFurnitureEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory?: SubCategoryFurnitureEntity;

  @OneToMany(() => QuantityFurnitureInOrderEntity, (entity) => entity.furniture)
  quantityFurniture?: QuantityFurnitureInOrderEntity[];
}
