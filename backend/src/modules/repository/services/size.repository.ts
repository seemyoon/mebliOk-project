import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SizeEntity } from '../../../database/entities/size.entity';

@Injectable()
export class SizeRepository extends Repository<SizeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SizeEntity, dataSource.manager);
  }
}
