import { Injectable } from '@nestjs/common';

import { FurnitureEntity } from '../../../database/entities/furniture.entity';
import { BrandMapper } from '../../brand/services/brand.mapper';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { FurnitureBaseResDto } from '../dto/res/base-furniture.res.dto';
import { FurnitureListResDto } from '../dto/res/furniture-list.res.dto';

@Injectable()
export class FurnitureMapper {
  public static toResDto(data: FurnitureEntity): FurnitureBaseResDto {
    return {
      id: data.id,
      name: data.name,
      brand: data.brand ? BrandMapper.toResDto(data.brand) : null,
      description: data.description,
      materials: Array.isArray(data.materials)
        ? data.materials.map((m) => m)
        : [],
      color: Array.isArray(data.color) ? data.color.map((c) => c) : [],
      body: data.body,
      price: data.price,
      discount: data?.discount,
      created: data.createdAt,
      updated: data.updatedAt,
      deleted: data.deleted,
      sellerType: data.sellerType,
    };
  }

  public static toResDtoList(
    data: FurnitureEntity[],
    total: number,
    query: ListFurnitureQueryDto,
  ): FurnitureListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
