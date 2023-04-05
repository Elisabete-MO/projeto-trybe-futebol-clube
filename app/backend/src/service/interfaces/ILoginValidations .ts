import { IUserLogin } from './ILoginService';

export default interface ILoginValidations {
  validateUser(user: IUserLogin): void;
  validatePassword(password: string, passwordData: string): Promise<void>;
  validateId(user: IUserLogin): void;
}
