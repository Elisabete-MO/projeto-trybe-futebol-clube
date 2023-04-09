import chai from 'chai';
import sinon from 'sinon';
// @ts-ignore
import 'sinon-chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import UserModel from '../database/models/user.model'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

import UserSequelizeRepository from '../repositories/UserSequelize.repository ';
import { IUser, IUserWithId } from '../service/interfaces/IUserService';
import NotFoundError from '../middlewares/errors/notFound.error';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

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
      const httpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
        password: '1234567'
      });

      userModelMock = sinon.stub(UserModel, 'findOne');
      userModelMock.resolves([]);

      const email = 'email@email.com';
      const userRepository = new UserSequelizeRepository(UserModel);

      await expect(userRepository.postLogin(email));
      expect(userModelMock.calledOnce).to.be.true;
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
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
