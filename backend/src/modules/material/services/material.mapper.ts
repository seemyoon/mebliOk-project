import { Injectable } from '@nestjs/common';

import { MaterialEntity } from '../../../database/entities/material.entity';
import { ListMaterialsQueryDto } from '../dto/req/list-materials.query.dto';
import { MaterialResDto } from '../dto/res/material.res.dto';
import { MaterialsListResDto } from '../dto/res/materials-list.res.dto';

@Injectable()
export class MaterialFurnitureMapper {
  public static toResDto(data: MaterialEntity): MaterialResDto {
    return {
      id: data.id,
      material_name: data.material_name,
      created: data.createdAt,
      updated: data.updatedAt,
    };
  }

  public static toResDtoList(
    data: MaterialEntity[],
    total: number,
    query: ListMaterialsQueryDto,
  ): MaterialsListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
