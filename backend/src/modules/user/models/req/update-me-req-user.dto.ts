import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateMeReqUserDto extends PickType(BaseUserReqDto, [
  'name',
  'role',
]) {}
