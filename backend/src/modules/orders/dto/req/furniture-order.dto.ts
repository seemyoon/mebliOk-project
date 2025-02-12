import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class ProductOrderDto {
  @ApiProperty({
    example: 'name of furniture',
    description: 'name of the furniture in the order.',
  })
  @IsString()
  furniture_name: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the furniture in the order.',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
