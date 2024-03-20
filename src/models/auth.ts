import { User } from './user';

export interface IAuth {
  user: User;
  accessToken: string;
  refreshToken: string;
}
