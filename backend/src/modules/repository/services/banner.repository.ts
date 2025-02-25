import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BannerID } from '../../../common/types/entity-ids.type';
import { BannerEntity } from '../../../database/entities/banner.entity';
import { ListBannersQueryDto } from '../../banner/dto/req/list-banners.query.dto';

@Injectable()
export class BannerRepository extends Repository<BannerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BannerEntity, dataSource.manager);
  }

  public async findAll(
    query: ListBannersQueryDto,
  ): Promise<[BannerEntity[], number]> {
    const qb = this.createQueryBuilder('banner');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByBannerId(bannerId: BannerID): Promise<BannerEntity> {
    const qb = this.createQueryBuilder('banner');

    qb.where('banner.id = :bannerId', { bannerId });
    return await qb.getOne();
  }
}
