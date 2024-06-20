import { Session } from 'express-session';
import { AccessToken } from '../../interfaces/user.interface';

export interface ISession extends Session {
  email?: string;
  token?: AccessToken;
}
