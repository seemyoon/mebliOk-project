import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class ResetPasswordChangeReqDto extends PickType(BaseUserReqDto, [
  'password',
]) {}
