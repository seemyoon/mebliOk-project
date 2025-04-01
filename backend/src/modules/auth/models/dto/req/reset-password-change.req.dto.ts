import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../../user/models/req/base-user.req.dto';

export class ResetPasswordChangeReqDto extends PickType(BaseUserReqDto, [
  'password',
]) {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  token: string;
}
