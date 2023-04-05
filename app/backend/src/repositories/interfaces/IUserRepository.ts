import { IUserLogin } from '../../service/interfaces/ILoginService';
import { IUserWithId } from '../../service/interfaces/IUserService';

export default interface IUserRepository {
  getAll(): Promise<IUserWithId[]>;
  getById(id: number): Promise<IUserWithId>;
  getByEmail(email: string): Promise<IUserWithId>;
  postLogin(email: string): Promise<IUserLogin>;
  getLogin(id: number, email:string, password: string, role: string): Promise<IUserLogin>;
  // create(user: IUser): Promise<IUserWithId>;
}
