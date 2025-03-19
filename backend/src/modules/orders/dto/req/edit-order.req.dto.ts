import { PickType } from '@nestjs/swagger';

import { BaseOrderReqDto } from './base-order.req.dto';

export class EditOrderReqDto extends PickType(BaseOrderReqDto, ['furniture']) {}
