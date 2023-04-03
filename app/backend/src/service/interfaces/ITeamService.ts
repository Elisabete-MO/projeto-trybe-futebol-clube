export interface ITeam {
  teamName: string,
}

export interface ITeamWithId extends ITeam {
  id: number,
}

export default interface ITeamService {
  getAll(): Promise<ITeamWithId[]>
  getById(id: number): Promise<ITeamWithId>
  // create(team: ITeam): Promise<Omit<ITeamWithId, 'password'>>
}
