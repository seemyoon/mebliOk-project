import { PickType } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListBrandsQueryDto extends PickType(PaginationQueryDto, [
  'search',
  'limit',
  'offset',
]) {}
