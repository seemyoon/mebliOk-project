import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class ColorReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'Brown',
    description: 'Color of the furniture',
  })
  color_name: string;
}
