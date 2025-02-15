import { ApiProperty } from '@nestjs/swagger';

import { BrandID } from '../../../../common/types/entity-ids.type';

export class BrandResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Brand ID',
  })
  id: BrandID;

  @ApiProperty({
    example: 'Daming',
    description: 'Brand name',
  })
  brand_name: string;

  @ApiProperty({
    description: 'When the brand was removed',
  })
  deleted?: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Creation date of the brand',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Last update date of the brand',
  })
  updated: Date;
}
