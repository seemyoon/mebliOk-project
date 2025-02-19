import { PickType } from '@nestjs/swagger';

import { ColorReqDto } from './color.req.dto';

export class UpdateColorReqDto extends PickType(ColorReqDto, ['color_name']) {}
