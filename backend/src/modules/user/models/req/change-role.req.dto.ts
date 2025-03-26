import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class ChangeRoleReqDto extends PickType(BaseUserReqDto, ['role']) {}
