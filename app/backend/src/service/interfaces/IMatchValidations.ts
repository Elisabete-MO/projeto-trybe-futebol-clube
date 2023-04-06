import { IMatch } from './IMatchService';
import { ITeamWithId } from './ITeamService';

export default interface IMatchValidations {
  validateMatch(match: IMatch, homeTeamExists: ITeamWithId, awayTeamExist: ITeamWithId): void;
}
