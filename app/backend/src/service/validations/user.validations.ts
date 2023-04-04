import UnauthorizedError from '../../middlewares/errors/unauthorized.error';
import InvalidParamsError from '../../middlewares/errors/invalidParams.error';
import { IUser } from '../interfaces/IUserService';
import IUserValidations from '../interfaces/IUserValidations';

export default class UserValidations implements IUserValidations {
  validateUsername = (username: string): void => {
    if (username.length < 4) {
      throw new InvalidParamsError('User name must be at least 3 characters long');
    }
  };

  validateEmail = (email: string): void => {
    const emailValidation = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailValidation.test(email)) {
      throw new UnauthorizedError('Invalid email or password');
    }
  };

  validatePassword = (password: string): void => {
    if (password.length < 6) {
      throw new UnauthorizedError('Invalid email or password');
    }
  };

  validateUser(user: IUser): void {
    this.validateUsername(user.username);
    this.validateEmail(user.email);
    this.validatePassword(user.password);
  }
}
