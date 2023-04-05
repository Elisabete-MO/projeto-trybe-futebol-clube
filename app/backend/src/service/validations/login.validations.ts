import bcrypt from 'bcryptjs';
import { IUserLogin } from '../interfaces/ILoginService';
import ILoginValidations from '../interfaces/ILoginValidations ';
import UnauthorizedError from '../../middlewares/errors/unauthorized.error';
import NotFoundError from '../../middlewares/errors/notFound.error';

const UNAUTHORIZED_MESSAGE = 'Invalid email or password';

export default class LoginValidations implements ILoginValidations {
  validateUser = (user: IUserLogin): void => {
    if (!user) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
  };

  validatePassword = async (password: string, passwordData: string): Promise<void> => {
    if (!password) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
    const match = await bcrypt.compare(password, passwordData);
    if (!match) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
  };

  validateId = (user: IUserLogin): void => {
    if (!user) {
      throw new NotFoundError('User not found');
    }
  };
}
