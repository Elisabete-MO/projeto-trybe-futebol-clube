import UserModel from '../database/models/user.model';
import NotFoundError from '../middlewares/errors/notFound.error';
import { IUser, IUserWithId } from '../service/interfaces/IUserService';
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

  async getByLogin(email: string): Promise<IUser> {
    const user = await this._userModel.findOne({
      where: { email },
      attributes: ['email', 'password'], // campos a serem retornados
    });
    return user as IUser;
  }

  // async create(user: IUser): Promise<IUserWithId> {
  //   const isUser = this.getByEmail(user.email);
  //   if (isUser) throw new ConflictError('This username already exists');
  //   return this._userModel.create(user);
  // }
}
