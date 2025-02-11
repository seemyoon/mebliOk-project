import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BrandReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'KAN',
    description: 'Brand of the furniture',
  })
  brand_name: string;
}
