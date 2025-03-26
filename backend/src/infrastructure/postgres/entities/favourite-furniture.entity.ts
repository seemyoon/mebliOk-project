import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import {
  FavouriteFurnitureID,
  UserID,
} from '../../../common/types/entity-ids.type';
import { FurnitureEntity } from './furniture.entity';
import { UserEntity } from './users.entity';

@Entity(TableNameEnum.FAVOURITE_FURNITURE)
export class FavouriteFurnitureEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: FavouriteFurnitureID;

  @Column({ type: 'uuid', nullable: true })
  furniture_id: FavouriteFurnitureID;
  @OneToOne(() => FurnitureEntity, (entity) => entity.favouriteFurniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'furniture_id' })
  furniture?: FurnitureEntity;

  @Column({ type: 'uuid', nullable: true })
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.favouriteFurniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
