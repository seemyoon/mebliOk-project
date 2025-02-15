import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

import { BrandResDto } from '../../../brand/dto/res/brand.res.dto';
import { SellerEnum } from '../../../user/enum/seller.enum';

export class FurnitureBaseResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Furniture ID',
  })
  id: string;

  @ApiProperty({
    example: 'Sofa Maria',
    description: 'Name of the furniture',
  })
  name: string;

  @ApiProperty({
    example: 'KAN',
    description: 'Brand of the furniture',
  })
  brand: BrandResDto;

  @ApiProperty({
    example: 'Comfortable sofa for the whole family',
    description: 'Short description of the furniture',
  })
  description: string;

  @ApiProperty({
    description: "Furniture's array photos",
  })
  photos?: string[] | null;

  @ApiProperty({
    description: "Furniture's array materials",
  })
  materials: string[];

  @ApiProperty({
    example: 'This furniture is made of high-quality materials',
    description: 'Main content of the furniture',
  })
  body: string;

  @ApiProperty({
    example: 'This furniture is made of high-quality materials',
    description: 'Main content of the furniture',
  })
  color: string[];

  @IsInt()
  @ApiProperty({
    example: 5000,
    description: 'Price of the furniture',
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Discount (percent) of the furniture',
  })
  discount?: number | null;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Creation date of the article',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Last update date of the article',
  })
  updated: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Deleted date of the article',
  })
  deleted: Date;

  @ApiProperty({
    enum: SellerEnum,
    example: SellerEnum.SELLER,
    description: 'Type of seller',
  })
  sellerType?: SellerEnum;
}
