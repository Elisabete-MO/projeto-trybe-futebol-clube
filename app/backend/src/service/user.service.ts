import IUserService, { IUserWithId } from './interfaces/IUserService';
import IUserRepository from '../repositories/UserSequelize.repository ';
import IUserValidations from './interfaces/IUserValidations';

export default class userService implements IUserService {
  private _userValidations: IUserValidations;
  private _userRepository: IUserRepository;

  constructor(
    userValidations: IUserValidations,
    userRepository: IUserRepository,
  ) {
    this._userValidations = userValidations;
    this._userRepository = userRepository;
  }

  async getAll(): Promise<IUserWithId[]> {
    const users = await this._userRepository.getAll();
    return users;
  }

  async getById(requestedId: number): Promise<IUserWithId> {
    const user = await this._userRepository.getById(requestedId);
    const { username, id, email } = user;
    return { id, username, email };
  }

  async getByEmail(emailData: string): Promise<IUserWithId> {
    this._userValidations.validateEmail(emailData);
    const user = await this._userRepository.getByEmail(emailData);
    const { id, username, email } : { id: number, username: string, email: string } = user;
    return { id, username, email };
  }
}
