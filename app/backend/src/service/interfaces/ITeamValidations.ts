import { ITeam } from './ITeamService';

export default interface ITeamValidations {
  validateTeamName(teamName: string): void;
  validateTeam(team: ITeam): void;
}
