import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';
import { IsNotEmpty, IsString } from 'class-validator';

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
