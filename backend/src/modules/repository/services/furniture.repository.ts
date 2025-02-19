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

    if (query.inStock !== undefined) {
      qb.andWhere('furniture.in_stock = :in_stock');
      qb.setParameter('in_stock', query.inStock);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    if (query.sortBy && query.sortOrder) {
      switch (query.sortBy) {
        case 'price':
          qb.orderBy(
            'furniture.price',
            query.sortOrder === 'asc' ? 'ASC' : 'DESC',
          );
          break;
        case 'novelty':
          qb.addOrderBy(
            'furniture.createdAt',
            query.sortOrder === 'asc' ? 'ASC' : 'DESC',
          );
          break;
        case 'name':
          qb.addOrderBy(
            'furniture.name',
            query.sortOrder === 'asc' ? 'ASC' : 'DESC',
          );
          break;
        // case 'popularity':
        //   qb.addOrderBy(
        //     'furniture.popularity', // todo. popularity depends on the number of views or sold
        //     query.sortOrder === 'asc' ? 'ASC' : 'DESC',
        //   );
        //   break;
        default:
          break;
      }
    }

    return await qb.getManyAndCount();
  }

  public async findByFurnitureId(
    furnitureID: FurnitureID,
  ): Promise<FurnitureEntity> {
    const qb = this.createQueryBuilder('furniture');
    qb.leftJoinAndSelect('furniture.size', 'size')
      .leftJoinAndSelect('furniture.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('furniture.subcategory', 'subcategory')
      .leftJoinAndSelect('furniture.category', 'category');

    qb.where('furniture.id = :furnitureID', { furnitureID });
    return await qb.getOne();
  }
}
