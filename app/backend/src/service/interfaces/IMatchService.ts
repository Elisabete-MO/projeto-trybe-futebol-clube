export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default interface IMatchService {
  getAll(): Promise<IMatch[]>
  getById(id: number): Promise<IMatch>
}
