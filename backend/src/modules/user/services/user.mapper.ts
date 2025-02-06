import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      role: user.role,
      created: user.createdAt,
      updated: user.updatedAt,
    };
  }

  public static toResDtoList(
    data: UserEntity[],
    total: number,
    query: ListUsersQueryDto,
  ): UsersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toIUserData(user: UserEntity): IUserData {
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
