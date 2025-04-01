import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class ResetPasswordSendReqDto extends PickType(BaseUserReqDto, [
  'email',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
