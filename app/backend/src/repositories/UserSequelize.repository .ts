import { IUserLogin } from '../service/interfaces/ILoginService';
import UserModel from '../database/models/user.model';
import NotFoundError from '../middlewares/errors/notFound.error';
import { IUserWithId } from '../service/interfaces/IUserService';
import IUserRepository from './interfaces/IUserRepository';

export default class UserSequelizeRepository implements IUserRepository {
  constructor(private _userModel = UserModel) {}

  async getAll(): Promise<IUserWithId[]> {
    const users = await this._userModel.findAll();
    if (!users.length) throw new NotFoundError('No users found');
    return users;
  }

  async getById(id: number): Promise<IUserWithId> {
    const user = await this._userModel.findByPk(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async getByEmail(email: string): Promise<IUserWithId> {
    const user = await this._userModel.findOne({ where: { email } });
    return user as IUserWithId;
  }

  async postLogin(email: string): Promise<IUserLogin> {
    const user = await this._userModel.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'role'], // campos a serem retornados
    });
    return user as IUserLogin;
  }

  async getLogin(id: number, email:string, password: string, role: string): Promise<IUserLogin> {
    const user = await this._userModel.findOne({
      where: { id, email, password, role },
      attributes: ['role'],
    });
    return user as IUserLogin;
  }
}
