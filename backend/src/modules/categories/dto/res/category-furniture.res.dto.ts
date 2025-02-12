import { ApiProperty } from '@nestjs/swagger';

import { CategoryFurnitureID } from '../../../../common/types/entity-ids.type';

export class CategoryFurnitureResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Category Furniture ID',
  })
  id: CategoryFurnitureID;

  @ApiProperty({
    example: 'Furniture for kitchen',
    description: 'Title name',
  })
  title: string;

  @ApiProperty({
    description: 'When the furniture was removed',
  })
  deleted?: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Creation date of the furniture',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Last update date of the furniture',
  })
  updated: Date;
}
