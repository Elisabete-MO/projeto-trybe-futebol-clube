import chai from 'chai';
import sinon from 'sinon';
// @ts-ignore
import 'sinon-chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import MatchModel from '../database/models/match.model'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

import BoardSequelizeRepository from '../repositories/BoardSequelize.repository';
import { ITeam, IMatchData } from '../service/interfaces/IBoardService';
import NotFoundError from '../middlewares/errors/notFound.error';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

const { expect } = chai;

describe('GET  /leaderboard', () => {
  let boardModelMock: any;

  afterEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {
    it('should throw a NotFoundError if no teams are found', async () => {
      boardModelMock = sinon.stub(MatchModel, 'findAll');
      boardModelMock.resolves([]);

      const boardRepository = new BoardSequelizeRepository(MatchModel);

      await expect(boardRepository.getAllTeamMatches()).to.be.rejectedWith(NotFoundError);
      expect(boardModelMock.calledOnce).to.be.true;
    });

    it('should return an array of results', async () => {
      const teams: IMatchData[] = [{ id: 1, homeTeamId: 1, homeTeamGoals: 0, awayTeamId: 20, awayTeamGoals: 0, inProgress: false, homeTeam: '', awayTeam: '' }];
      boardModelMock = sinon.stub(MatchModel, 'findAll');
      boardModelMock.resolves(teams);
      const boardRepository = new BoardSequelizeRepository(MatchModel);
      const result = await boardRepository.getAllTeamMatches();
      expect(result).to.deep.equal(teams);
      expect(boardModelMock.calledOnce).to.be.true;
    });
  });
});
