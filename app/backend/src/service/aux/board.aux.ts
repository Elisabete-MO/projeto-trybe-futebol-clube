import IBoardAux from '../interfaces/IBoardAux';
import { IMatchData, ITeam } from '../interfaces/IBoardService';

export default class BoardAux implements IBoardAux {
  sortData = (teams: Record<string, ITeam>) =>
    Object.values(teams).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });

  // atualização de cada propriedade
  updateTeamStats = (team: ITeam, goalsFavor: number, goalsOwn: number) => {
    const teamData = { ...team };
    teamData.totalGames += 1;
    teamData.goalsFavor += goalsFavor;
    teamData.goalsOwn += goalsOwn;
    teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
    teamData
      .efficiency = `${((teamData.totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2)}%`;
    return teamData;
  };

  calculatePoints = (team: ITeam, homeGoals: number, awayGoals: number)
  : { team: ITeam } => {
    const updatedTeam = { ...team };
    if (homeGoals > awayGoals) {
      updatedTeam.totalVictories += 1;
      updatedTeam.totalPoints += 3;
    } else if (homeGoals < awayGoals) {
      updatedTeam.totalLosses += 1;
    } else {
      updatedTeam.totalDraws += 1;
      updatedTeam.totalPoints += 1;
    }
    return { team: updatedTeam };
  };

  createTeam = (teamName: string): ITeam => ({
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
  });

  // verifica se a equipe já existe em teams e retorna uma cópia atualizada de teams
  createOrUpdateTeam = (teams: Record<string, ITeam>, teamName: string) => {
    const updatedTeams = { ...teams };
    const team = updatedTeams[teamName] || this.createTeam(teamName);
    updatedTeams[teamName] = team;
    return team;
  };

  calculateData = (
    team: ITeam,
    homeGoals: number,
    awayGoals: number,
  ): { team: ITeam } => {
    const { team: updatedTeam } = this
      .calculatePoints(team, homeGoals, awayGoals);
    const updatedTeamStats = this
      .updateTeamStats(updatedTeam, homeGoals, awayGoals);
    return { team: updatedTeamStats };
  };

  calculateRanking = (matches: IMatchData[], type: string) => {
    const teams: Record<string, ITeam> = {};

    matches.forEach((match) => {
      if (!match.inProgress) {
        if (type === 'away') {
          const { team } = this.calculateData(
            this.createOrUpdateTeam(teams, match.awayTeam),
            match.awayTeamGoals,
            match.homeTeamGoals,
          ); teams[team.name] = team;
        } else {
          const { team } = this.calculateData(
            this.createOrUpdateTeam(teams, match.homeTeam),
            match.homeTeamGoals,
            match.awayTeamGoals,
          ); teams[team.name] = team;
        }
      }
    }); return this.sortData(teams);
  };
}
