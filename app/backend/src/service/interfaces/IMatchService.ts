export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatches extends IMatch{
  homeTeam: {
    teamName?: string;
  };
  awayTeam: {
    teamName?: string;
  };
}

export interface IUpdateScoreRequest {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IMatchService {
  getAll(): Promise<IMatches[]>
  getById(id: number): Promise<IMatch>
  finishMatch(id: number): Promise<IMatch>
  updateMatch(id: number, body: IUpdateScoreRequest): Promise<IMatch>
  createMatch(body: IMatch): Promise<IMatch>
}
