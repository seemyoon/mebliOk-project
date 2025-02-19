import { PickType } from '@nestjs/swagger';

import { MaterialReqDto } from './material.req.dto';

export class UpdateMaterialReqDto extends PickType(MaterialReqDto, [
  'material_name',
]) {}
