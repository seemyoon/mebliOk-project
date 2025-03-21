import { PickType } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListBannersQueryDto extends PickType(PaginationQueryDto, [
  'offset',
  'limit',
]) {}
