import { PickType } from '@nestjs/swagger';

import { CreateFurnitureReqDto } from './create-furniture.req.dto';

export class UpdateFurnitureReqDto extends PickType(CreateFurnitureReqDto, [
  'name',
  'brand',
  'description',
  'materials',
  'body',
  'color',
  'price',
  'discount',
]) {}
