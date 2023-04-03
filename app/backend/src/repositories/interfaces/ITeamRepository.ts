import { ITeamWithId } from '../../service/interfaces/ITeamService';

export default interface ITeamRepository {
  getAll(): Promise<ITeamWithId[]>;
  getById(id: number): Promise<ITeamWithId>;
}
// create(team: ITeam): Promise<ITeamWithId>;
