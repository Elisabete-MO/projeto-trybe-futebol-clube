import IUserRepository from '../repositories/UserSequelize.repository ';
import ILoginService, { IUserLogin } from './interfaces/ILoginService';
import ILoginValidations from './interfaces/ILoginValidations ';
import IUserValidations from './interfaces/IUserValidations';

export default class loginService implements ILoginService {
  private _userValidations: IUserValidations;
  private _loginValidations: ILoginValidations;
  private _userRepository: IUserRepository;

  constructor(
    userValidations: IUserValidations,
    loginValidations: ILoginValidations,
    userRepository: IUserRepository,
  ) {
    this._userValidations = userValidations;
    this._loginValidations = loginValidations;
    this._userRepository = userRepository;
  }

  async getByLogin(emailData: string, passwordData: string): Promise<IUserLogin> {
    this._userValidations.validateEmail(emailData);
    this._userValidations.validatePassword(passwordData);
    const user = await this._userRepository.getByLogin(emailData);
    this._loginValidations.validateUser(user);
    const { password } = user;
    const result = this._loginValidations.validatePassword(password, passwordData);
    return result;
  }
}
