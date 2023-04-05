import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import LoginService from '../service/login.service';
import { IUserLogin } from '../service/interfaces/ILoginService';
import UserValidations from '../service/validations/user.validations';
import LoginValidations from '../service/validations/login.validations';
import UserSequelizeRepository from '../repositories/UserSequelize.repository ';

const JWT_SECRET = 'jwt_secret';

const loginService = new LoginService(
  new UserValidations(),
  new LoginValidations(),
  new UserSequelizeRepository(),
);

declare module 'express' {
  export interface Request {
    user?: IUserLogin;
  }
}

interface JwtPayload {
  data: {
    userId: number;
    userEmail: string;
    userPassword: string;
    userRole: string;
  }
}

const validateAuth = () => async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const { userId, userEmail, userRole, userPassword } = decoded.data;
    const user: IUserLogin = await loginService.getLogin(userId, userEmail, userPassword, userRole);
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateAuth;
