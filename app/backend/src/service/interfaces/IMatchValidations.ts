import { IMatch } from './IMatchService';

export default interface IMatchValidations {
  // validateMatchName(matchName: string): void;
  validateMatch(match: IMatch): void;
}
