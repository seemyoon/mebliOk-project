import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UpdateCalculateFurnitureRateReqDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 60,
  })
  order_criterion: number;
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 40,
  })
  view_criterion: number;
}
