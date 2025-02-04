import { UserResDto } from '../../../../user/models/res/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  user: UserResDto;
  tokens: TokenPairResDto;
}
