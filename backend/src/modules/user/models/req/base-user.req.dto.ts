import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { UserEnum } from '../../enum/users.enum';

export class BaseUserReqDto {
  @ApiProperty({ example: 'Oleksandr' })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'alejandrosdeveloper@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '+380688899945' })
  @IsString()
  @IsPhoneNumber(null, { message: 'Phone number must be valid' })
  phoneNumber: string;

  @ApiProperty({ example: '123qweQWE' })
  @IsNotIn(['password', '123456789', 'qwerty'])
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    enum: UserEnum,
    example: UserEnum.REGISTERED_CLIENT,
  })
  @IsEnum(UserEnum, { message: 'Role must be a valid enum value' })
  @IsString()
  role: UserEnum;
}
