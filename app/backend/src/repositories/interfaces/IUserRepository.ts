import { IUser, IUserWithId } from '../../service/interfaces/IUserService';

export default interface IUserRepository {
  getAll(): Promise<IUserWithId[]>;
  getById(id: number): Promise<IUserWithId>;
  getByEmail(email: string): Promise<IUserWithId>;
  getByLogin(email: string): Promise<IUser>;
  // create(user: IUser): Promise<IUserWithId>;
}
