import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class GoogleSignUpReqDto extends PickType(BaseUserReqDto, [
  'email',
  'phoneNumber',
  'password',
  'name',
  'avatar',
]) {}
