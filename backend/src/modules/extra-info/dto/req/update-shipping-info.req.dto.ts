import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class UpdateShippingInfoReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'New title',
    description: 'asd',
  })
  title: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'New description',
    description: 'dsa',
  })
  description: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'New description',
    description: 'dsa',
  })
  body: string;
}
