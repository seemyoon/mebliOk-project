import { PickType } from '@nestjs/swagger';

import { BrandReqDto } from './brand.req.dto';

export class UpdateBrandReqDto extends PickType(BrandReqDto, ['brand_name']) {}
