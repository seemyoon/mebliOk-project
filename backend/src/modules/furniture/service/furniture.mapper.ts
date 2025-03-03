import { Injectable } from '@nestjs/common';

import { FurnitureEntity } from '../../../infrastructure/postgres/entities/furniture.entity';
import { SizeEntity } from '../../../infrastructure/postgres/entities/size.entity';
import { BrandMapper } from '../../brand/services/brand.mapper';
import { CategoriesMapper } from '../../categories/services/categories.mapper.service';
import { ColorFurnitureMapper } from '../../color/services/color.mapper';
import { MaterialFurnitureMapper } from '../../material/services/material.mapper';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { FurnitureBaseResDto } from '../dto/res/base-furniture.res.dto';
import { FurnitureListResDto } from '../dto/res/furniture-list.res.dto';
import { SizeResDto } from '../dto/res/size.res.dto';

@Injectable()
export class FurnitureMapper {
  public static toResDto(data: FurnitureEntity): FurnitureBaseResDto {
    return {
      id: data.id,
      name: data.name,
      brand: data.brand ? BrandMapper.toResDto(data.brand) : null,
      description: data?.description,
      materials: data.material
        ? data.material.map((material) =>
            MaterialFurnitureMapper.toResDto(material),
          )
        : [],
      color: data.color
        ? data.color.map((color) => ColorFurnitureMapper.toResDto(color))
        : [],
      body: data.body,
      price: data.price,
      discount: data?.discount,
      photos: data.photos ? data.photos.map((photo) => photo) : [],
      created: data.createdAt,
      updated: data.updatedAt,
      weight: data?.weight,
      in_stock: data.in_stock,
      size: this?.toResSizeDto(data.size),
      category: CategoriesMapper.toResCategoryFurnitureDto(data.category),
      subcategory: CategoriesMapper.toResSubCategoryFurnitureDto(
        data.subcategory,
      ),
      deleted: data.deleted,
      sellerType: data.sellerType,
    };
  }

  public static toResSizeDto(data: SizeEntity): SizeResDto {
    return {
      id: data.id,
      height: data?.height,
      width: data?.width,
      length: data?.length,
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
