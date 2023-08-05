import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import { app } from '../app';

import errorMiddleware from '../middlewares/error.middleware';

chai.use(chaiHttp);

describe('ErrorMiddleware', () => {
  beforeEach(() => {
    nock('http://localhost:5432')
      .get('/test')
      .replyWithError({ message: 'Connection lost' });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('deve retornar status 500 para erros não conhecidos', async () => {
    const httpResponse = await chai.request(app).get('/notIdentified');
    expect(httpResponse.status).to.equal(500);
  });
});
