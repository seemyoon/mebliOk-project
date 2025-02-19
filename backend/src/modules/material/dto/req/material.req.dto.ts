import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class MaterialReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'Wood',
    description: 'Material of the furniture',
  })
  material_name: string;
}
