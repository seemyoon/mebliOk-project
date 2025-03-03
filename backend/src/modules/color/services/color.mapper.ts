import { Injectable } from '@nestjs/common';

import { ColorEntity } from '../../../infrastructure/postgres/entities/color.entity';
import { ListColorsQueryDto } from '../dto/req/list-colors.query.dto';
import { ColorResDto } from '../dto/res/color.res.dto';
import { ColorsListResDto } from '../dto/res/colors-list.res.dto';

@Injectable()
export class ColorFurnitureMapper {
  public static toResDto(data: ColorEntity): ColorResDto {
    return {
      id: data.id,
      color_name: data.color_name,
    };
  }

  public static toResDtoList(
    data: ColorEntity[],
    total: number,
    query: ListColorsQueryDto,
  ): ColorsListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
