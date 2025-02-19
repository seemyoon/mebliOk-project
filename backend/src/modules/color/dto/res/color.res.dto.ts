import { ApiProperty } from '@nestjs/swagger';

import { ColorID } from '../../../../common/types/entity-ids.type';

export class ColorResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Color ID',
  })
  id: ColorID;

  @ApiProperty({
    example: 'Brown',
    description: 'Color name',
  })
  color_name: string;

  @ApiProperty({
    description: 'When the color was removed',
  })
  deleted?: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Creation date of the color',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Last update date of the color',
  })
  updated: Date;
}
