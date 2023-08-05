import chai from 'chai';
import sinon from 'sinon';
// @ts-ignore
import 'sinon-chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import UserModel from '../database/models/user.model'
import loginService from '../service/login.service';
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

import UserSequelizeRepository from '../repositories/UserSequelize.repository ';
import { IUser, IUserWithId } from '../service/interfaces/IUserService';
import NotFoundError from '../middlewares/errors/notFound.error';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';
import LoginValidations from '../service/validations/login.validations';
import UserValidations from '../service/validations/user.validations';
import { IUserLogin } from '../service/interfaces/ILoginService';

const { expect } = chai;

describe('/login', () => {
  let userModelMock: any;

  afterEach(() => {
    sinon.restore();
  });
  describe('/POST', () => {
    it('should throw a InvalidParamsError if the email is not provided', async () => {
      const httpResponse = await chai.request(app)
      .post('/login')
      .send({
        password: "1234667",
      })
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should throw a InvalidParamsError if the password is not provided', async () => {
      const httpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
      })
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should throw a UnauthorizedError if the email is not in the format email@email.com', async () => {
      const httpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'emailemail.com',
        password: '1234567'
      });
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
    });

    it('should throw a UnauthorizedError if the password have 6 or less characters', async () => {
      const httpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
        password: '12345'
      });
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
    });

    it('should throw a UnauthorizedError if the user not found', async () => {
      const email = 'email@email.com';
      const password = '1234567';
      const httpResponse = await chai.request(app)
      .post('/login')
      .send({
        email,
        password,
      });

      const user: IUserLogin = { id: 21, email, password, role: 'user'};
      const token = 'generatedToken123';
      userModelMock = sinon.stub(UserModel, 'findOne');
      userModelMock.resolves('');

      const userRepository = new UserSequelizeRepository(UserModel);
      const LoginService = new loginService(new UserValidations(), new LoginValidations(), userRepository);

      const result = await LoginService.postLogin(email, password);

      expect(userModelMock.calledOnce).to.be.true;
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })

      // describe('quando o email já estiver cadastrado no banco de dados', () => {
      //   it('deve retornar um status 409', async () => {
      //     const user = { 
      //       id: 1,
      //       username: 'Tryber',
      //       email: 'tryber@mail.com',
      //       password: '123456'
      //     }
        //   sinon.stub(Model, 'findOne').resolves(user as User)
        //   const httpResponse = await chai.request(app)
        //     .post('/users')
        //     .send({
        //       username: 'Tryber',
        //       email: 'tryber@mail.com',
        //       password: '123456'
        //     })
        //   expect(httpResponse.status).to.be.equal(409)
        //   expect(httpResponse.body).to.be.deep.equal({ error: 'This username already exists' })
        // })
    });

    it('should return a token for a valid user', async () => {
      const email = 'admin@admin.com';
      const password = 'secret_admin';
      const user: IUserLogin = { id: 1, email, password, role: 'admin'};
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.

      userModelMock = sinon.stub(UserModel, 'findOne');
      userModelMock.resolves(user);

      const userRepository = new UserSequelizeRepository(UserModel);
      const LoginService = new loginService(new UserValidations(), new LoginValidations(), userRepository);

      const result = await LoginService.postLogin(email, password);
      console.log(result)

      expect(userModelMock.calledOnce).to.be.true;
      expect(result).to.be.equal(token);


      // const userRepository = new UserSequelizeRepository(UserModel);
      // const result = await userRepository.getAll();
      // expect(result).to.deep.equal(user);
      // expect(userModelMock.calledOnce).to.be.true;
      // const httpResponse = await chai.request(app)
      // .post('/login')
      // .send({
      //   email: 'email@email.com',
      //   password: '1234567'
      // });
      // expect(httpResponse.status).to.be.equal(200);
      // expect(httpResponse.body).to.be.deep.equal(user);
    });

  });

  describe('/GET', () => {
    it('should throw a UnauthorizedError if the password is wrong', async () => {
      const user = {
        id: 1,
        email: 'email@email.com',
        password: '123456',
        role: 'admin'
      };

      const userPass = {
        id: 1,
        email: 'email@email.com',
        password: '1234567',
        role: 'admin'
      };

      const password = '';
      const httpResponse = await chai.request(app)
      .get('/login')
      .send(user);

      userModelMock = sinon.stub(UserModel, 'findOne');
      userModelMock.resolves(userPass);

      const userRepository = new UserSequelizeRepository(UserModel);

      await expect(userRepository.getLogin(user.id, user.email, user.password, user.role));
      expect(userModelMock.calledOnce).to.be.true;
      expect(httpResponse.status).to.be.equal(404)
      expect(httpResponse.body).to.be.deep.equal({})
    });
  });
});

// describe('quando a requisição é feita com sucesso', () => {
//   it('deve retornar um status 201', async () => {
//     const createdUser = { 
//       id: 1,
//       username: 'Tryber',
//       email: 'tryber@mail.com',
//       password: '123456'
//     }
//     sinon.stub(Model, 'findOne').resolves(null)
//     sinon.stub(Model, 'create').resolves(createdUser as User)

//     const httpResponse = await chai.request(app)
//       .post('/users')
//       .send({
//         username: 'Tryber',
//         email: 'tryber@mail.com',
//         password: '123456'
//       })
//     expect(httpResponse.status).to.be.equal(201)
//     expect(httpResponse.body).to.be.deep.equal({
//       id: 1,
//       username: 'Tryber',
//       email: 'tryber@mail.com',
//     })