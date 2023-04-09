import IBoardService, { IMatchData, ITeam } from './interfaces/IBoardService';
import BoardRepository from '../repositories/BoardSequelize.repository';
import BoardAux from './aux/board.aux';

export default class BoardService implements IBoardService {
  private _boardRepository: BoardRepository;
  private _boardAux: BoardAux;

  constructor(
    boardRepository: BoardRepository,
    boardAux: BoardAux,
  ) {
    this._boardRepository = boardRepository;
    this._boardAux = boardAux;
  }

  private static createTeam(teamName: string): ITeam {
    return {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    };
  }

  private static updateTeamStats(team: ITeam, goalsFavor: number, goalsOwn: number) {
    const teamData = { ...team };
    teamData.totalGames += 1;
    teamData.goalsFavor += goalsFavor;
    teamData.goalsOwn += goalsOwn;
    teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
    teamData
      .efficiency = `${((teamData.totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2)}%`;
    return teamData;
  }

  private static createOrUpdateTeam(teams: Record<string, ITeam>, teamName: string) {
    const updatedTeams = { ...teams };
    const team = updatedTeams[teamName] || BoardService.createTeam(teamName);
    updatedTeams[teamName] = team;
    return team;
  }

  private static calculatePoints(hTeam: ITeam, aTeam: ITeam, hTeamGoals: number, aTeamGoals: number)
    : { hTeam: ITeam, aTeam: ITeam } {
    const updatedHomeTeam = { ...hTeam };
    const updatedAwayTeam = { ...aTeam };
    if (hTeamGoals > aTeamGoals) {
      updatedHomeTeam.totalVictories += 1;
      updatedHomeTeam.totalPoints += 3;
      updatedAwayTeam.totalLosses += 1;
    } else if (hTeamGoals < aTeamGoals) {
      updatedAwayTeam.totalVictories += 1;
      updatedAwayTeam.totalPoints += 3;
      updatedHomeTeam.totalLosses += 1;
    } else {
      updatedHomeTeam.totalDraws += 1;
      updatedHomeTeam.totalPoints += 1;
      updatedAwayTeam.totalDraws += 1;
      updatedAwayTeam.totalPoints += 1;
    }
    return { hTeam: updatedHomeTeam, aTeam: updatedAwayTeam };
  }

  private static calculatePointsHelper(
    homeTeam: ITeam,
    awayTeam: ITeam,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): { homeTeam: ITeam, awayTeam: ITeam } {
    const { hTeam: updatedHomeTeam, aTeam: updatedAwayTeam } = BoardService
      .calculatePoints(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    const updatedHomeTeamStats = BoardService
      .updateTeamStats(updatedHomeTeam, homeTeamGoals, awayTeamGoals);
    const updatedAwayTeamStats = BoardService
      .updateTeamStats(updatedAwayTeam, awayTeamGoals, homeTeamGoals);
    return { homeTeam: updatedHomeTeamStats, awayTeam: updatedAwayTeamStats };
  }

  private static calculateRanking(matches: IMatchData[]): ITeam[] {
    const teams: Record<string, ITeam> = {};

    matches.forEach((match) => {
      if (!match.inProgress) {
        const { homeTeam, awayTeam } = BoardService
          .calculatePointsHelper(
            BoardService.createOrUpdateTeam(teams, match.homeTeam),
            BoardService
              .createOrUpdateTeam(teams, match.awayTeam),
            match.homeTeamGoals,
            match.awayTeamGoals,
          );
        teams[homeTeam.name] = homeTeam;
        teams[awayTeam.name] = awayTeam;
      }
    });
    return Object.values(teams).sort((a, b) => b.totalPoints - a.totalPoints);
  }

  async getAllTeamMatches(type: string): Promise<ITeam[]> {
    let result: ITeam[];
    const matches = await this._boardRepository.getAllTeamMatches();
    switch (type) {
      case '/leaderboard/home':
        result = this._boardAux.calculateRanking(matches, 'home');
        break;
      case '/leaderboard/away':
        result = this._boardAux.calculateRanking(matches, 'away');
        break;
      default:
        result = BoardService.calculateRanking(matches);
        break;
    }
    return result;
  }
}
