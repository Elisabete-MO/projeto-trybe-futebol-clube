import NotFoundError from '../../middlewares/errors/notFound.error';
import UnprocessableContentError from '../../middlewares/errors/unprocessable.error';
import InvalidParamsError from '../../middlewares/errors/invalidParams.error';
import { IMatch } from '../interfaces/IMatchService';
import IMatchValidations from '../interfaces/IMatchValidations';
import { ITeamWithId } from '../interfaces/ITeamService';

export default class MatchValidations implements IMatchValidations {
  validateNumbers = (data: IMatch): void => {
    if (
      typeof data.homeTeamId !== 'number'
      || typeof data.awayTeamId !== 'number'
      || typeof data.homeTeamGoals !== 'number'
      || typeof data.awayTeamGoals !== 'number'
    ) {
      throw new InvalidParamsError('All teams IDs and goals must be numbers');
    }
  };

  validateIds = (data: IMatch): void => {
    if (
      data.homeTeamId === data.awayTeamId) {
      throw new
      UnprocessableContentError('It is not possible to create a match with two equal teams');
    }
  };

  validateTeams = (homeTeamExists: ITeamWithId, awayTeamExist: ITeamWithId): void => {
    if (!homeTeamExists || !awayTeamExist) {
      throw new NotFoundError('There is no team with such id!');
    }
  };

  validateMatch(data: IMatch, homeTeamExists: ITeamWithId, awayTeamExist: ITeamWithId): void {
    this.validateNumbers(data);
    this.validateIds(data);
    this.validateTeams(homeTeamExists, awayTeamExist);
  }
}
