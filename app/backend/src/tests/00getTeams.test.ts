import chai from 'chai';
import sinon from 'sinon';
// @ts-ignore
import 'sinon-chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import TeamModel from '../database/models/team.model'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

import TeamSequelizeRepository from '../repositories/TeamSequelize.repository';
import { ITeamWithId } from '../service/interfaces/ITeamService';
import NotFoundError from '../middlewares/errors/notFound.error';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

const { expect } = chai;

describe('GET  /team', () => {
  let teamModelMock: any;

  afterEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {
    it('should throw a NotFoundError if no teams are found', async () => {
      teamModelMock = sinon.stub(TeamModel, 'findAll');
      teamModelMock.resolves([]);

      const teamRepository = new TeamSequelizeRepository(TeamModel);

      await expect(teamRepository.getAll()).to.be.rejectedWith(NotFoundError);
      expect(teamModelMock.calledOnce).to.be.true;
    });

    it('should return an array of teams', async () => {
      const teams: ITeamWithId[] = [{ id: 1, teamName: 'Team A' }];
      teamModelMock = sinon.stub(TeamModel, 'findAll');
      teamModelMock.resolves(teams);

      const teamRepository = new TeamSequelizeRepository(TeamModel);
      const result = await teamRepository.getAll();
      expect(result).to.deep.equal(teams);
      expect(teamModelMock.calledOnce).to.be.true;
      const httpResponse = await chai.request(app).get('/teams');
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(teams);
    });
  });

  describe('getById', () => {
    it(`should throw an InvalidParamsError if it's different from a number`, async () => {
      const httpResponse = await chai.request(app).get('/teams/a');
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Params should be a number' })
    });

    it('should throw a NotFoundError if no teams are found', async () => {
      teamModelMock = sinon.stub(TeamModel, 'findByPk');
      teamModelMock.resolves(null);

      const httpResponse = await chai.request(app).get('/teams/99');
      expect(httpResponse.status).to.be.equal(404)
      expect(httpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!' })

      const teamRepository = new TeamSequelizeRepository(TeamModel);

      await expect(teamRepository.getById(99)).to.be.rejectedWith(NotFoundError);
      sinon.assert.called(teamModelMock);
    });

    it('should return a team and 200 status', async () => {
      teamModelMock = sinon.stub(TeamModel, 'findByPk');
      const team: ITeamWithId = { id: 1, teamName: 'Team A' };
      teamModelMock.resolves(team);

      const httpResponse = await chai.request(app).get('/teams/1')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.be.deep.equal({ id: 1, teamName: 'Team A' })

      const teamRepository = new TeamSequelizeRepository(TeamModel);
      const result = await teamRepository.getById(1);
      expect(result).to.deep.equal(team);
      sinon.assert.called(teamModelMock);
    });
  });
});
