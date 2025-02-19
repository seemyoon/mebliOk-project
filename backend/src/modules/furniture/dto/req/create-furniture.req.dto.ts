import { Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsString,
  IsUUID,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ColorID, MaterialID } from '../../../../common/types/entity-ids.type';

export class CreateFurnitureReqDto {
  @ApiProperty({
    example: 'Chair',
    description: 'Name of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Attractive chair for the whole family',
    description: 'Short description of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'This furniture is made of high-quality materials',
    description: 'Main content of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  body?: string;

  @ApiProperty({
    example: '20 kg',
    description: 'Main content of the furniture',
  })
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  weight?: string;

  @IsInt()
  @ApiProperty({
    example: 5000,
    description: 'Price of the furniture',
  })
  price: number;

  @IsInt()
  @ApiProperty({
    example: 100,
    description: 'Price of the furniture',
  })
  height: number;

  @IsInt()
  @ApiProperty({
    example: 200,
    description: 'Price of the furniture',
  })
  width: number;

  @IsInt()
  @ApiProperty({
    example: 300,
    description: 'Price of the furniture',
  })
  length: number;

  @IsUUID('4', { each: true })
  materialIDs: MaterialID[];

  @IsUUID('4', { each: true })
  colorIDs: ColorID[];
}
