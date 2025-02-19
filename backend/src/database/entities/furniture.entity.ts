import {
  Column,
  Entity,
  JoinColumn, ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  BrandID,
  CategoryFurnitureID,
  ColorID,
  FurnitureID,
  MaterialID, SizeID,
  SubCategoryFurnitureID,
} from '../../common/types/entity-ids.type';
import { SellerEnum } from '../../modules/user/enum/seller.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { BrandEntity } from './brand.entity';
import { CategoryFurnitureEntity } from './category-furniture.entity';
import { ColorEntity } from './color.entity';
import { MaterialEntity } from './material.entity';
import { QuantityFurnitureInOrderEntity } from './quantity-furniture-in-order.entity';
import { SizeEntity } from './size.entity';
import { SubCategoryFurnitureEntity } from './subcategory-furniture.entity';

@Entity(TableNameEnum.FURNITURE)
export class FurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: FurnitureID;

  @Column('text')
  name: string;

  @Column('json', { nullable: true })
  photos?: string[];

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'enum', enum: SellerEnum, nullable: true })
  sellerType?: SellerEnum;

  @Column({ type: 'int' })
  price: number;

  @Column('int', { default: 0, nullable: true })
  weight?: string;

  @Column('boolean', { default: true })
  in_stock: boolean;

  @Column('int', { default: 0, nullable: true })
  discount?: number;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column()
  size_id: SizeID;
  @OneToOne(() => SizeEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'size_id' })
  size?: SizeEntity;

  @Column()
  brand_id: BrandID;
  @ManyToOne(() => BrandEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @Column()
  color_id: ColorID;
  @ManyToOne(() => ColorEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'color_id' })
  color?: ColorEntity[];

  @Column()
  material_id: MaterialID;
  @ManyToOne(() => MaterialEntity, (entity) => entity.furniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'material_id' })
  material?: MaterialEntity[];

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
