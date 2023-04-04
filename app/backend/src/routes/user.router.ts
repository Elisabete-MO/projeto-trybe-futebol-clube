import { Router } from 'express';
import UserController from '../controller/user.controller ';
import UserService from '../service/user.service';
import UserSequelizeRepository from '../repositories/UserSequelize.repository ';
import UserValidations from '../service/validations/user.validations';

const router = Router();

const userRepository = new UserSequelizeRepository();
const userValidations = new UserValidations();
const userService = new UserService(userValidations, userRepository);
const userController = new UserController(userService);

router
  .get('/users', userController.getAll.bind(userController))
  .get('/users/:id', userController.getById.bind(userController))
  .patch('/users', userController.getByEmail.bind(userController));

export default router;
