import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsEmailOrPhone } from '../../../decorators/is_valid_username.decorator';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignInReqDto extends PickType(BaseAuthReqDto, [
  'password',
  'deviceId',
]) {
  @ApiProperty({ example: 'alejandrosdeveloper@gmail.com' })
  @IsEmailOrPhone({ message: 'Enter valid email or phone number' })
  login: string;
}
