import { ApiProperty } from '@nestjs/swagger';

import { FurnitureID } from '../../../../common/types/entity-ids.type';

export class FurnitureStatisticBaseResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Furniture ID',
  })
  furnitureId: FurnitureID;
  getNumberOfViews: number;
  getDailyViews: number;
  getWeeklyViews: number;
  getMonthlyViews: number;
}
