import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { FurnitureEntity } from '../../../database/entities/furniture.entity';
import { ListFurnitureQueryDto } from '../../furniture/dto/req/list-furniture-query.dto';

@Injectable()
export class FurnitureRepository extends Repository<FurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FurnitureEntity, dataSource.manager);
  }

  public async findAll(
    query: ListFurnitureQueryDto,
  ): Promise<[FurnitureEntity[], number]> {
    const qb = this.createQueryBuilder('furniture');
    qb.leftJoinAndSelect('furniture.size', 'size');

    if (query.search) {
      qb.andWhere(
        'CONCAT(furniture.name, furniture.description) ILIKE :search',
      );
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByFurnitureId(
    furnitureID: FurnitureID,
  ): Promise<FurnitureEntity> {
    const qb = this.createQueryBuilder('furniture');
    qb.leftJoinAndSelect('furniture.size', 'size');

    qb.where('furniture.id = :furnitureID', { furnitureID });
    return await qb.getOne();
  }
}
