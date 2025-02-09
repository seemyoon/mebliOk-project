import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateFurnitureReqDto {
  @ApiProperty({
    example: 'Sofa Maria',
    description: 'Name of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  name: string;

  @ApiProperty({
    example: 'KAN',
    description: 'Brand of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  brand: string;

  @ApiProperty({
    example: 'Comfortable sofa for the whole family',
    description: 'Short description of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  description: string;

  @ApiProperty({
    example: 'This furniture is made of high-quality materials',
    description: 'Main content of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  body: string;

  @ApiProperty({
    example: ['wood', 'plastic'],
    description: "Furniture's array materials",
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  materials: string[];

  @ApiProperty({
    example: ['red', 'blue'],
    description: 'Colors of the furniture',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  color: string[];

  @ApiProperty({
    example: 10,
    description: 'Discount (percent) of the furniture',
  })
  @IsInt()
  @IsOptional()
  discount?: number | null;

  @IsInt()
  @ApiProperty({
    example: 5000,
    description: 'Price of the furniture',
  })
  price: number;
}
