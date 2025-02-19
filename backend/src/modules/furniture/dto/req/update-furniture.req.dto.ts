import { PickType } from '@nestjs/swagger';

import { CreateFurnitureReqDto } from './create-furniture.req.dto';

export class UpdateFurnitureReqDto extends PickType(CreateFurnitureReqDto, [
  'name',
  'description',
  'body',
  'price',
  'weight',
  'height',
  'width',
  'length',
  'colorIDs',
  'materialIDs',
]) {}
