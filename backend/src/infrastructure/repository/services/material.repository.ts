import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MaterialID } from '../../../common/types/entity-ids.type';
import { ListMaterialsQueryDto } from '../../../modules/material/dto/req/list-materials.query.dto';
import { MaterialEntity } from '../../postgres/entities/material.entity';

@Injectable()
export class MaterialRepository extends Repository<MaterialEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MaterialEntity, dataSource.manager);
  }

  public async findAll(
    query: ListMaterialsQueryDto,
  ): Promise<[MaterialEntity[], number]> {
    const qb = this.createQueryBuilder('material');
    qb.leftJoinAndSelect('material.furniture', 'furniture');

    if (query.search) {
      qb.andWhere('material.material_name ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByMaterialId(
    materialId: MaterialID,
  ): Promise<MaterialEntity> {
    const qb = this.createQueryBuilder('material');
    qb.leftJoinAndSelect('material.furniture', 'furniture');

    qb.where('material.id = :materialId', { materialId });
    return await qb.getOne();
  }

  public async findByMaterialIds(
    materialId: MaterialID[],
  ): Promise<MaterialEntity[]> {
    const qb = this.createQueryBuilder('material');
    qb.leftJoinAndSelect('material.furniture', 'furniture');

    qb.where('material.id IN (:...materialId)', { materialId });
    return await qb.getMany();
  }
}
