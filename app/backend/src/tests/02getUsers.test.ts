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

describe('GET  /user', () => {
  let userModelMock: any;

  afterEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {
    it('should throw a NotFoundError if no users are found', async () => {
      userModelMock = sinon.stub(UserModel, 'findAll');
      userModelMock.resolves([]);

      const userRepository = new UserSequelizeRepository(UserModel);

      await expect(userRepository.getAll()).to.be.rejectedWith(NotFoundError);
      expect(userModelMock.calledOnce).to.be.true;
    });

    it('should return an array of users', async () => {
      const users: IUserWithId[] = [{ id: 1, username: 'User A', email: 'email@email.com' }];
      userModelMock = sinon.stub(UserModel, 'findAll');
      userModelMock.resolves(users);

      const userRepository = new UserSequelizeRepository(UserModel);
      const result = await userRepository.getAll();
      expect(result).to.deep.equal(users);
      expect(userModelMock.calledOnce).to.be.true;
    });
  });

  describe('getById', () => {
    it(`should throw an InvalidParamsError if it's different from a number`, async () => {
      const httpResponse = await chai.request(app).get('/users/a');
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Params should be a number' })
    });

    it('should throw a NotFoundError if no users are found', async () => {
      userModelMock = sinon.stub(UserModel, 'findByPk');
      userModelMock.resolves(null);

      const httpResponse = await chai.request(app).get('/users/99');
      expect(httpResponse.status).to.be.equal(404)
      expect(httpResponse.body).to.be.deep.equal({ message: 'User not found' })

      const userRepository = new UserSequelizeRepository(UserModel);

      await expect(userRepository.getById(99)).to.be.rejectedWith(NotFoundError);
      sinon.assert.called(userModelMock);
    });

    it('should return a user and 200 status', async () => {
      userModelMock = sinon.stub(UserModel, 'findByPk');
      const user: IUserWithId = { id: 1, username: 'User A', email: 'email@email.com' };
      userModelMock.resolves(user);

      const httpResponse = await chai.request(app).get('/users/1')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.be.deep.equal(user)

      const userRepository = new UserSequelizeRepository(UserModel);
      const result = await userRepository.getById(1);
      expect(result).to.deep.equal(user);
      sinon.assert.called(userModelMock);
    });
  });

  describe('getByEmail', () => {
    it('should throw a NotFoundError if no users are found', async () => {
      userModelMock = sinon.stub(UserModel, 'findOne');
      userModelMock.resolves(null);

      const httpResponse = await chai.request(app)
      .post('/users')
      .send({
        email: 'email_inválido',
      })
      expect(httpResponse.status).to.be.equal(404)
      expect(httpResponse).to.be.deep.equal({ message: 'User not found' })

      const userRepository = new UserSequelizeRepository(UserModel);

      await expect(userRepository.getById(99)).to.be.rejectedWith(NotFoundError);
      sinon.assert.called(userModelMock);
    });

    it('should return a user and 200 status', async () => {
      userModelMock = sinon.stub(UserModel, 'findOne');
      const user: IUserWithId = { id: 1, username: 'User A', email: 'email@email.com' };
      userModelMock.resolves(user);

      const httpResponse = await chai.request(app)
      .post('/users')
      .send({
        email: 'email@email.com',
      });
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.be.deep.equal(user)

      const userRepository = new UserSequelizeRepository(UserModel);
      const result = await userRepository.getById(1);
      expect(result).to.deep.equal(user);
      sinon.assert.called(userModelMock);
    });
  });
});
