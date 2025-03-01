import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { BrandID } from '../../../../common/types/entity-ids.type';

export class ListFurnitureQueryDto {
  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 100, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
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

  @ApiPropertyOptional({ enum: ['price', 'popularity', 'novelty', 'name'] })
  @IsOptional()
  @IsEnum(['price', 'popularity', 'novelty', 'name'])
  @IsString()
  sortBy?: 'price' | 'popularity' | 'novelty' | 'name';

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  brandId?: BrandID;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsString()
  inStock?: boolean;
}
