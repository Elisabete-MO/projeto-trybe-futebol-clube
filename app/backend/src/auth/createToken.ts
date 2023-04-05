import jwt, { Algorithm } from 'jsonwebtoken';
import { IUserLogin } from '../service/interfaces/ILoginService';

const JWT_SECRET = 'jwt_secret';

export default function generateToken(user: IUserLogin): string {
  const { id, email, role, password } = user;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256' as Algorithm,
  };
  const token = jwt.sign({ data: {
    userId: id,
    userEmail: email,
    userRole: role,
    userPassword: password,
  } }, JWT_SECRET, jwtConfig);
  return token;
}
