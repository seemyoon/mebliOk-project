import { ListUsersQueryDto } from '../req/list-users.query.dto';
import { UserResDto } from './user.res.dto';

export class UsersListResDto extends ListUsersQueryDto {
  data: UserResDto[];
  total: number;
}
