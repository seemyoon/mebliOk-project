import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { UserEnum } from '../../enum/users.enum';
import { BaseUserReqDto } from './base-user.req.dto';

export class CreateUserReqUserDto extends PickType(BaseUserReqDto, [
  'email',
  'phoneNumber',
  'password',
  'name',
]) {
  @ApiProperty({
    enum: UserEnum,
    example: UserEnum.ADMIN,
  })
  @IsEnum(UserEnum, { message: 'Role must be a valid enum value' })
  @IsString()
  role: UserEnum;
}
