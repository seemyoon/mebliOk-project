import { PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';

export class ListOrdersQueryDto extends PickType(PaginationQueryDto, [
  'limit',
  'offset',
  'search',
]) {
  @IsOptional()
  @IsString()
  ready?: boolean;
}
