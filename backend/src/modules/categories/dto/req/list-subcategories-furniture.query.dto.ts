import { PickType } from '@nestjs/swagger';

import { ListCategoriesFurnitureQueryDto } from './list-categories-furniture.query.dto';

export class ListSubCategoriesFurnitureQueryDto extends PickType(
  ListCategoriesFurnitureQueryDto,
  ['search', 'offset', 'limit'],
) {}
