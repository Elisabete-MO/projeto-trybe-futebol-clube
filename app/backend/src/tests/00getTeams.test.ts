import * as chai from 'chai';
import * as sinon from 'sinon';
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

const { expect } = chai;

describe('GET  /team', () => {
  let teamModelMock: any;
  
  beforeEach(() => {
    teamModelMock = sinon.stub(TeamModel, 'findAll');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {
    it('should throw a NotFoundError if no teams are found', async () => {
      teamModelMock.resolves([]);

      const teamRepository = new TeamSequelizeRepository(TeamModel);

      await expect(teamRepository.getAll()).to.be.rejectedWith(NotFoundError);
      expect(teamModelMock.findAll).to.have.been.calledOnce('select');
    });

    it('should return an array of teams', async () => {
      const teams: ITeamWithId[] = [{ id: 1, teamName: 'Team A' }];
      teamModelMock.resolves(teams);

      const teamRepository = new TeamSequelizeRepository(TeamModel);
      const result = await teamRepository.getAll();
      expect(result).to.deep.equal(teams);
      expect(teamModelMock.findAll).to.have.been.calledOnce('select');
    });
  });
});
