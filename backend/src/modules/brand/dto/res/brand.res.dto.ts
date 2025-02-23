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
}
