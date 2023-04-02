import { ITeam } from '../interfaces/ITeamService';
import InvalidParamsError from '../../middlewares/errors/invalidParams.error';
import ITeamValidations from '../interfaces/ITeamValidations';

export default class TeamValidations implements ITeamValidations {
  validateTeamName = (teamName: string): void => {
    if (teamName.length < 4) {
      throw new InvalidParamsError('Team name must be at least 3 characters long');
    }
  };

  validateTeam(team: ITeam): void {
    this.validateTeamName(team.teamName);
  }
}
