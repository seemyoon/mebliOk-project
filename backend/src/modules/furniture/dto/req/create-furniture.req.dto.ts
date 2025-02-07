import { PickType } from '@nestjs/swagger';

import { FurnitureBaseResDto } from '../res/base-furniture.res.dto';

export class CreateFurnitureReqDto extends PickType(FurnitureBaseResDto, [
  'name',
  'brand',
  'description',
  'photos',
  'materials',
  'body',
  'color',
  'price',
  'discount',
]) {}
