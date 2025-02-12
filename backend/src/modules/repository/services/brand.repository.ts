import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandID } from '../../../common/types/entity-ids.type';
import { BrandEntity } from '../../../database/entities/brand.entity';
import { ListBrandsQueryDto } from '../../brand/dto/req/list-brands.query.dto';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }

  public async findAll(
    query: ListBrandsQueryDto,
  ): Promise<[BrandEntity[], number]> {
    const qb = this.createQueryBuilder('brand');
    qb.leftJoinAndSelect('brand.furniture', 'furniture');

    if (query.search) {
      qb.andWhere('brand.brand_name ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByBrandId(brandId: BrandID): Promise<BrandEntity> {
    const qb = this.createQueryBuilder('brand');
    qb.leftJoinAndSelect('brand.furniture', 'furniture');

    qb.where('brand.id = :brandId', { brandId });
    return await qb.getOne();
  }
}
