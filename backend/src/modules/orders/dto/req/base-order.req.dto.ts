import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { QuantityFurnitureInOrderDto } from './quantity-furniture-in-order.dto';

export class BaseOrderReqDto {
  @ApiProperty({
    example: [
      { name: 'cherry', quantity: 2 },
      { name: 'orange', quantity: 3 },
    ],
    description: 'List of products with product IDs and quantities.',
    type: [QuantityFurnitureInOrderDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuantityFurnitureInOrderDto)
  furniture: QuantityFurnitureInOrderDto[];

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'testuser@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email?: string;

  @ApiProperty({ example: '+380631353945' })
  @IsString()
  @IsPhoneNumber(null, { message: 'Phone number must be valid' })
  phoneNumber?: string;
}
