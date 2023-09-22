import TeamsModel from './ITeamsl';

export default interface ITeamsModel {
  getAllTeams(): Promise<TeamsModel[]>,
}
