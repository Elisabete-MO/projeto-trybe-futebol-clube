export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName?: string;
  };
  awayTeam: {
    teamName?: string;
  };
}

export default interface IMatchService {
  getAll(): Promise<IMatch[]>
  // getById(id: number): Promise<IMatch>
}
