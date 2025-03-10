import { UserEnum } from '../enum/users.enum';

export interface IUser {
  id: string,
  name?: string,
  email?: string,
  phoneNumber?: string,
  avatar?: string,
  role?: UserEnum,
  created?: string,
  updated?: string,
  deleted?: string,
}