import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'phoneNumber',
  'password',
  'name',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
