import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ColorID } from '../../../common/types/entity-ids.type';
import { ColorEntity } from '../../../database/entities/color.entity';
import { ListColorsQueryDto } from '../../color/dto/req/list-colors.query.dto';

@Injectable()
export class ColorRepository extends Repository<ColorEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ColorEntity, dataSource.manager);
  }

  public async findAll(
    query: ListColorsQueryDto,
  ): Promise<[ColorEntity[], number]> {
    const qb = this.createQueryBuilder('color');
    qb.leftJoinAndSelect('color.furniture', 'furniture');

    if (query.search) {
      qb.andWhere('color.color_name ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByColorId(colorId: ColorID): Promise<ColorEntity> {
    const qb = this.createQueryBuilder('color');
    qb.leftJoinAndSelect('color.furniture', 'furniture');

    qb.where('color.id = :colorId', { colorId });
    return await qb.getOne();
  }

  public async findByColorIds(colorIds: ColorID[]): Promise<ColorEntity[]> {
    const qb = this.createQueryBuilder('color');
    qb.leftJoinAndSelect('color.furniture', 'furniture');

    qb.where('color.id IN (:...colorId)', { colorIds });
    return await qb.getMany();
  }
}
