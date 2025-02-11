import { Injectable } from '@nestjs/common';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { ListBrandsQueryDto } from '../dto/req/list-brands.query.dto';
import { BrandResDto } from '../dto/res/brand.res.dto';
import { BrandsListResDto } from '../dto/res/brands-list.res.dto';

@Injectable()
export class BrandMapper {
  public static toResDto(data: BrandEntity): BrandResDto {
    return {
      id: data.id,
      brand_name: data.brand_name,
      created: data.createdAt,
      updated: data.updatedAt,
    };
  }

  public static toResDtoList(
    data: BrandEntity[],
    total: number,
    query: ListBrandsQueryDto,
  ): BrandsListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
