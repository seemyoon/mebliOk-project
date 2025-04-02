import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEnum } from '../../../modules/user/enum/users.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FavouriteFurnitureEntity } from './favourite-furniture.entity';
import { OrderEntity } from './order.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text', { unique: true, nullable: true })
  email?: string;

  @Column('text', { nullable: true })
  name?: string;

  @Column('text', { unique: true, nullable: true })
  phoneNumber: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @Column('text', { select: false, nullable: true })
  password?: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column({ type: 'enum', enum: UserEnum })
  role: UserEnum;

  @OneToMany(() => OrderEntity, (entity) => entity.user)
  orders?: OrderEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => FavouriteFurnitureEntity, (entity) => entity.user)
  favouriteFurniture?: FavouriteFurnitureEntity[];
}
