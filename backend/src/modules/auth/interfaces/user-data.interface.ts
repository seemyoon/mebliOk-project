import { UserID } from '../../../common/types/entity-ids.type';
import { UserEnum } from '../../user/enum/users.enum';

export interface IUserData {
  userId: UserID;
  role: UserEnum;
  deviceID: string; // If the user logs in from a different device (or browser), the client must pass a different deviceId.
  email: string;
}
