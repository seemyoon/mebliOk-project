import { PickType } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListFavouriteFurnitureQueryDto extends PickType(
  PaginationQueryDto,
  ['offset', 'search', 'limit'],
) {}
