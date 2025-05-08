import { PickType } from '@nestjs/swagger';

import { SubCategoryFurnitureID } from '../../../../common/types/entity-ids.type';
import { CategoryFurnitureResDto } from './category-furniture.res.dto';

export class SubCategoryFurnitureResDto extends PickType(
  CategoryFurnitureResDto,
  ['title', 'photo'],
) {
  id: SubCategoryFurnitureID;
}
