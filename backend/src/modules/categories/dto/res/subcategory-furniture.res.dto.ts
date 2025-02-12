import { ApiProperty, PickType } from '@nestjs/swagger';

import { SubCategoryFurnitureID } from '../../../../common/types/entity-ids.type';
import { CategoryFurnitureResDto } from './category-furniture.res.dto';

export class SubCategoryFurnitureResDto extends PickType(
  CategoryFurnitureResDto,
  ['title', 'deleted', 'created', 'updated'],
) {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Category Furniture ID',
  })
  id: SubCategoryFurnitureID;
}
