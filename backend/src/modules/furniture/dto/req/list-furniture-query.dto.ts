import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { PaginationQueryDto } from '../../../../common/model/pagination.query.dto';
import { BrandID } from '../../../../common/types/entity-ids.type';
import { CurrencyEnum } from '../../enum/currency.enum';

export class ListFurnitureQueryDto extends PickType(PaginationQueryDto, [
  'offset',
  'search',
  'limit',
]) {
  @ApiPropertyOptional({ enum: ['price', 'popularity', 'novelty', 'name'] })
  @IsOptional()
  @IsEnum(['price', 'popularity', 'novelty', 'name'])
  @IsString()
  sortBy?: 'price' | 'popularity' | 'novelty' | 'name';

  @ApiPropertyOptional({ enum: ['USD', 'EUR', 'UAH'], default: 'UAH' })
  @IsEnum(['USD', 'EUR', 'UAH'])
  @IsString()
  currency?: CurrencyEnum;

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
