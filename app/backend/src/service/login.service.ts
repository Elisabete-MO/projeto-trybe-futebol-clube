import IUserRepository from '../repositories/UserSequelize.repository ';
import ILoginService, { IUserLogin } from './interfaces/ILoginService';
import ILoginValidations from './interfaces/ILoginValidations ';
import IUserValidations from './interfaces/IUserValidations';
import generateToken from '../auth/createToken';

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

  async postLogin(emailData: string, passwordData: string): Promise<string | void> {
    this._userValidations.validateEmail(emailData);
    this._userValidations.validatePassword(passwordData);
    const user = await this._userRepository.postLogin(emailData);
    this._loginValidations.validateUser(user);
    const { password } = user;
    const match = await this._loginValidations.validatePassword(passwordData, password);
    console.log(match);
    const token = generateToken(user);
    return token;
  }

  async getLogin(id: number, email:string, password: string, role: string): Promise<IUserLogin> {
    const user = await this._userRepository.getLogin(id, email, password, role);
    this._loginValidations.validateId(user);
    return user;
  }
}
