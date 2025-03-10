import { IUser } from './IUser';
import { ITokenObtainPair } from './ITokenObtainPair';

export interface IAuthResponseData {
  user: IUser,
  tokens: ITokenObtainPair
}