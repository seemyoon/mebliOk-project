import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'phoneNumber',
  'password',
  'name',
]) {}
