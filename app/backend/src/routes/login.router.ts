import { Router } from 'express';
import LoginController from '../controller/login.controller';
import LoginService from '../service/login.service';
import LoginSequelizeRepository from '../repositories/UserSequelize.repository ';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import UserValidations from '../service/validations/user.validations';
import LoginValidations from '../service/validations/login.validations';
import validateAuth from '../auth/validateAuth';

const router = Router();

const loginRepository = new LoginSequelizeRepository();
const loginValidations = new LoginValidations();
const userValidations = new UserValidations();
const loginService = new LoginService(userValidations, loginValidations, loginRepository);
const loginController = new LoginController(loginService);

router
  .post('/login', verifyRequiredFields('login'), loginController.login.bind(loginController))
  .get('/login/role', validateAuth(), loginController.getRole.bind(loginController));

export default router;
