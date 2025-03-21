import { PickType } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListUsersQueryDto extends PickType(PaginationQueryDto, [
  'offset',
  'limit',
  'search',
]) {}
