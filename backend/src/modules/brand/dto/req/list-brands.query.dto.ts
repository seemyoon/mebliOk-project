import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class ListBrandsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Type(() => Number)
  @Min(0)
  @IsInt()
  @IsOptional()
  offset?: number = 0;

  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  search?: string;
}
