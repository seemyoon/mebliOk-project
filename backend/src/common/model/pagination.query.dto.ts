import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../helpers/transform.helper';

export class PaginationQueryDto {
  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 100, default: 10 })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ type: Number, minimum: 0, default: 0 })
  @Type(() => Number)
  @Min(0)
  @IsInt()
  @IsOptional()
  offset?: number = 0;

  @ApiPropertyOptional({ type: String })
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  search?: string;
}
