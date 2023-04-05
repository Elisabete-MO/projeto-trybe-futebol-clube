import { IUser } from './IUserService';

export interface IUserLogin extends Omit<IUser, 'username'> {
  id: number,
  role: string,
}

export default interface ILoginService {
  postLogin(email: string, password: string): Promise<string | void>
  getLogin(id: number, email:string, password: string, role: string): Promise<IUserLogin>
}
