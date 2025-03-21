import { PickType } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListCustomersInfoQueryDto extends PickType(PaginationQueryDto, [
  'search',
  'offset',
  'limit',
]) {}
