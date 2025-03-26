import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ShippingMethodEnum } from '../../enums/shipping-method.enum';
import { QuantityFurnitureInOrderDto } from './quantity-furniture-in-order.dto';

export class BaseOrderReqDto {
  @ApiProperty({
    example: [
      {
        id: 'da18f6cd-fd2d-4055-b425-d53f44060f4e',
        quantity: 2,
      },
      {
        id: '11748ff6-452a-4247-a0b9-8d6e714def49',
        quantity: 1,
      },
    ],
  })
  @IsArray()
  @Type(() => QuantityFurnitureInOrderDto)
  furniture: QuantityFurnitureInOrderDto[];

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  user_name?: string;

  @ApiProperty({ example: 'Sumska' })
  @IsString()
  @Length(3, 50)
  @Type(() => String)
  @IsOptional()
  address?: string; // In FE must specify necessarily

  @ApiProperty({ example: 'Kharkiv' })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  @IsOptional()
  deliveryPlace?: string; // In FE must specify necessarily

  @ApiProperty({ example: 'I like your service' })
  @IsString()
  @Length(3, 70)
  @Type(() => String)
  @IsOptional()
  comment?: string;

  @ApiProperty({ example: 'testuser@gmail.com' })
  @IsString()
  @IsOptional()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email?: string;

  @ApiProperty({ example: '+380631353945' })
  @IsString()
  @IsPhoneNumber(null, { message: 'Phone number must be valid' })
  phoneNumber: string;

  @ApiProperty({
    enum: ShippingMethodEnum,
    example: ShippingMethodEnum.DELIVERY,
  })
  @IsEnum(ShippingMethodEnum, {
    message: 'Shipping method must be a valid enum value',
  })
  shippingMethod: ShippingMethodEnum;
}
