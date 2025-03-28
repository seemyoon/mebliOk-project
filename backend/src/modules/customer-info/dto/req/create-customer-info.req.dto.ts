import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateCustomerInfoReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'Dmytro',
  })
  name: string;

  @IsString()
  @ApiProperty({ example: '+380681353945' })
  phoneNumber: string;
}
