import Teams from '../database/models/Teams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Matches from '../database/models/Matches';
import ImatchCreated from '../Interfaces/ImatchCreated';

// tenho que retornar um objeto com as propriedades do ILeaderBoardModel.
//

interface ILeaderBoardModel {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

type teamsHomeOrAway = {
  id: number;
  teamName: string;
  homeTeam?: ImatchCreated[];
  awayTeam?: ImatchCreated[];
};

export default class LeaderBoardService {
  static async getLeaderBoard(homeOrAway: string): Promise<ServiceResponse<ILeaderBoardModel[]>> {
    const teams = await this.getTeams(homeOrAway);
    const res = teams.map((team: teamsHomeOrAway) => {
      if (team.homeTeam === undefined) throw new Error('homeTeam is undefined');
      const totalPoints = this.getReduce(team.homeTeam, (acc, match) => (acc + LeaderBoardService
        .getPoints(match.homeTeamGoals, match.awayTeamGoals)));
      const totalVictories = this.getReduce(team.homeTeam, (acc, match) => (acc + LeaderBoardService
        .getVictory(match.homeTeamGoals, match.awayTeamGoals)));
      const totalDraws = this.getReduce(team.homeTeam, (acc, match) => (acc + LeaderBoardService
        .getDraw(match.homeTeamGoals, match.awayTeamGoals)));
      const totalLosses = this.getReduce(team.homeTeam, (acc, match) => (acc + LeaderBoardService
        .getLoss(match.homeTeamGoals, match.awayTeamGoals)));
      const goalsFavor = team.homeTeam.reduce((acc, match) => acc + match.homeTeamGoals, 0);
      const goalsOwn = team.homeTeam.reduce((acc, match) => acc + match.awayTeamGoals, 0);
      const totalGames = totalVictories + totalDraws + totalLosses;
      return { name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
      };
    });
    return { status: 200, data: res };
  }

  static async getTeams(homeOrAway: string): Promise<Teams[]> {
    return Teams.findAll({
      include: [{ model: Matches, as: `${homeOrAway}Team`, where: { inProgress: false } }],
    });
  }

  static getReduce<T>(array: T[], callback: (acc: number, match: T) => number): number {
    return array.reduce((acc, match) => callback(acc, match), 0);
  }

  static getPoints(goals: number, goalsAgainst: number): number {
    if (goals > goalsAgainst) return 3;
    if (goals === goalsAgainst) return 1;
    return 0;
  }

  static getVictory(goals: number, goalsAgainst: number): number {
    if (goals > goalsAgainst) return 1;
    return 0;
  }

  static getDraw(goals: number, goalsAgainst: number): number {
    if (goals === goalsAgainst) return 1;
    return 0;
  }

  static getLoss(goals: number, goalsAgainst: number): number {
    if (goals < goalsAgainst) return 1;
    return 0;
  }
}

// const totalPoints = team.homeTeam.reduce((acc, match) => {
//   const points = LeaderBoardService.getPoints(match[`${homeOrAway}Team`].goals, match[`${homeOrAway}Team`].goalsAgainst);
//   return acc + points;
// }, 0);
// const totalVictories = team.homeTeam.reduce((acc, match) => {
//   const victory = LeaderBoardService.getVictory(match[`${homeOrAway}Team`].goals, match[`${homeOrAway}Team`].goalsAgainst);
//   return acc + victory;
// }, 0);
// const totalDraws = team.homeTeam.reduce((acc, match) => {
//   const draw = LeaderBoardService.getDraw(match[`${homeOrAway}Team`].goals, match[`${homeOrAway}Team`].goalsAgainst);
//   return acc + draw;
// }, 0);
// const totalLosses = team.homeTeam.reduce((acc, match) => {
//   const loss = LeaderBoardService.getLoss(match[`${homeOrAway}Team`].goals, match[`${homeOrAway}Team`].goalsAgainst);
//   return acc + loss;
// }, 0);
// const goalsFavor = team.homeTeam.reduce((acc, match) => acc + match[`${homeOrAway}Team`].goals, 0);
// const goalsOwn = team.homeTeam.reduce((acc, match) => acc + match[`${homeOrAway}Team`].goalsAgainst, 0);
// const totalGames = totalVictories + totalDraws + totalLosses;
// return {
//   name: team.name,
//   totalPoints,
//   totalGames,
//   totalVictories,
//   totalDraws,
//   totalLosses,
//   goalsFavor,
//   goalsOwn,
// };
