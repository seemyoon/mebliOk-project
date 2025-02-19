import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AssignDiscountReqDto {
  @IsInt()
  @ApiProperty({
    example: 10,
    description: 'Percentage of discount',
  })
  discount: number;
}
