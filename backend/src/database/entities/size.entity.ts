import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FurnitureID, SizeID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { FurnitureEntity } from './furniture.entity';

@Entity(TableNameEnum.SIZE)
export class SizeEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: SizeID;

  @Column('text')
  height: string;

  @Column('text')
  width: string;

  @Column('text')
  length: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column()
  furniture_id: FurnitureID;
  @OneToOne(() => FurnitureEntity, (entity) => entity.size, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  furniture?: FurnitureEntity;
}
