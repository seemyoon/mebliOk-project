import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { ListFurnitureQueryDto } from '../../../modules/furniture/dto/req/list-furniture-query.dto';
import { CurrencyService } from '../../api/service/currency.service';
import { FurnitureEntity } from '../../postgres/entities/furniture.entity';
import { BrandRepository } from './brand.repository';

@Injectable()
export class FurnitureRepository extends Repository<FurnitureEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly brandRepository: BrandRepository,
    private readonly apiService: CurrencyService,
  ) {
    super(FurnitureEntity, dataSource.manager);
  }

  public async findAll(
    query: ListFurnitureQueryDto,
  ): Promise<[FurnitureEntity[], number]> {
    const qb = this.createQueryBuilder('furniture');
    qb.leftJoinAndSelect('furniture.size', 'size');
    qb.leftJoinAndSelect('furniture.quantityFurniture', 'quantityFurniture');
    qb.leftJoinAndSelect('furniture.subcategory', 'subcategory');
    qb.leftJoinAndSelect('furniture.category', 'category');
    qb.leftJoinAndSelect('furniture.material', 'material');
    qb.leftJoinAndSelect('furniture.color', 'color');
    qb.leftJoinAndSelect('furniture.brand', 'brand');
    qb.leftJoinAndSelect(
      'furniture.furniture_statistic',
      'furniture_statistic',
    );

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

    if (query.brandId) {
      const brand = await this.brandRepository.findByBrandId(query.brandId);
      if (!brand) {
        throw new ConflictException('Brand not found');
      }
      qb.andWhere('furniture.brand_id = :brandId', { brandId: query.brandId });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    if (query.sortBy && query.sortOrder) {
      switch (query.sortBy) {
        case 'price':
          qb.orderBy(
            'furniture.currency',
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
        case 'popularity':
          const subQuery = this.createQueryBuilder('furniture_statistic')
            .select('SUM(furniture_statistic.count_views)', 'count_views')
            .where('furniture_statistic.furniture_id = furniture.id')
            .groupBy('furniture_statistic.furniture_id')
            .getQuery();

          qb.addOrderBy(
            `(${subQuery})`, // todo. add depends on the number of orders as well
            query.sortOrder === 'asc' ? 'ASC' : 'DESC',
          );
          break;
        default:
          break;
      }
    }

    const furnitureEntities = await qb.getMany();
    const count = await qb.getCount();

    if (query.currency) {
      for (const entity of furnitureEntities) {
        entity.price = await this.apiService.getCurrency(
          entity.price.toString(),
          query.currency,
        );
      }
    }

    return [furnitureEntities, count];
  }

  public async findByFurnitureId(
    furnitureID: FurnitureID,
  ): Promise<FurnitureEntity> {
    const qb = this.createQueryBuilder('furniture');
    qb.leftJoinAndSelect('furniture.size', 'size')
      .leftJoinAndSelect('furniture.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('furniture.subcategory', 'subcategory')
      .leftJoinAndSelect('furniture.category', 'category')
      .leftJoinAndSelect('furniture.material', 'material')
      .leftJoinAndSelect('furniture.color', 'color')
      .leftJoinAndSelect('furniture.brand', 'brand')
      .leftJoinAndSelect('quantityFurniture.order', 'order');

    qb.where('furniture.id = :furnitureID', { furnitureID });
    return await qb.getOne();
  }
}
