import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../common/types/entity-ids.type';
import { UserEnum } from '../../enum/users.enum';

export class BaseUserResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  phoneNumber?: string;
  email?: string;
  @ApiProperty({ enum: UserEnum, example: UserEnum.REGISTERED_CLIENT })
  role: UserEnum;
  deleted?: Date;
  created: Date;
  avatar?: string;
  updated?: Date;
}
