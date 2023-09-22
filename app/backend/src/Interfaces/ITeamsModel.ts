import ITeams from './ITeamsl';

export default interface ITeamsModel {
  getAllTeams(): Promise<ITeams[]>,
  getTeamById(id: ITeams['id']): Promise<ITeams | null>
}
