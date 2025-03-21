import { PickType } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListCategoriesFurnitureQueryDto extends PickType(
  PaginationQueryDto,
  ['search', 'offset', 'limit'],
) {}
