import { IUser } from './IUserService';

export interface IUserLogin extends Omit<IUser, 'username'> {
  password: string,
}

export default interface ILoginService {
  getByLogin(email: string, password: string): Promise<IUserLogin>
}
