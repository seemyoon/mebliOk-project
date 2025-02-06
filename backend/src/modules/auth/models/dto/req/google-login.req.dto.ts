import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class GoogleLoginReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'name',
  'phoneNumber',
  'avatar',
]) {}
