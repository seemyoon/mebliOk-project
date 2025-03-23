import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class UpdateCustomerReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'Natali',
  })
  name: string;

  @IsString()
  @ApiProperty({ example: '+380687353945' })
  phoneNumber?: string;
}
