import { Injectable } from '@nestjs/common';

import { BannerEntity } from '../../../database/entities/banner.entity';
import { ListBannersQueryDto } from '../dto/req/list-banners.query.dto';
import { BannerResDto } from '../dto/res/banner.res.dto';
import { BannersListResDto } from '../dto/res/banners-list.res.dto';

@Injectable()
export class BannerMapper {
  public static toResDto(data: BannerEntity): BannerResDto {
    return {
      id: data.id,
      photo: data?.photo,
    };
  }

  public static toResDtoList(
    data: BannerEntity[],
    total: number,
    query: ListBannersQueryDto,
  ): BannersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
