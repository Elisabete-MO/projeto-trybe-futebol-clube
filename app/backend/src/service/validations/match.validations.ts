import InvalidParamsError from '../../middlewares/errors/invalidParams.error';
import { IMatch } from '../interfaces/IMatchService';
import IMatchValidations from '../interfaces/IMatchValidations';

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

  validateMatch(data: IMatch): void {
    this.validateNumbers(data);
    // this.validateEmail(user.email);
    // this.validatePassword(user.password);
  }
}
