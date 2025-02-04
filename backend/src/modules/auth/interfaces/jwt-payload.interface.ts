import { UserID } from '../../../common/types/entity-ids.type';

export interface JwtPayload {
  userId: UserID;
}
