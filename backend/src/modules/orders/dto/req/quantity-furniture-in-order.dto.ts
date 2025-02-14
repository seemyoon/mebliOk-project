import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class QuantityFurnitureInOrderDto {
  @ApiProperty({
    example: 2,
    description: 'Quantity of the furniture in the order.',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
