import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotIn, IsString, Length, Matches } from 'class-validator';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class ChangePasswordReqDto extends PickType(BaseAuthReqDto, [
  'password',
]) {
  @ApiProperty({ example: '123qweQWE' })
  @IsNotIn(['password', 'qwerty', '123456789'])
  @IsString()
  @Length(0, 70)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  oldPassword: string;
}
