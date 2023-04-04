import { IUser } from './IUserService';

export default interface IUserValidations {
  validateUsername(username: string): void;
  validateUser(user: IUser): void;
  validateEmail(email: string): void;
  validatePassword(password: string): void;
}
