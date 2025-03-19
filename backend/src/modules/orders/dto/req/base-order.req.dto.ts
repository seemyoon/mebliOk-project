import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { QuantityFurnitureInOrderDto } from './quantity-furniture-in-order.dto';

export class BaseOrderReqDto {
  @ApiProperty({
    example: [
      {
        id: '284a5efa-54ea-4399-b77a-44062928a399',
        quantity: 2,
      },
      {
        id: 'c2f13926-4346-499a-b4b8-7944f53b3de3',
        quantity: 1,
      },
    ],
  })
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => QuantityFurnitureInOrderDto)
  furniture: QuantityFurnitureInOrderDto[];

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  user_name?: string;

  @ApiProperty({ example: 'testuser@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email?: string;

  @ApiProperty({ example: '+380631353945' })
  @IsString()
  @IsPhoneNumber(null, { message: 'Phone number must be valid' })
  phoneNumber: string;
}
