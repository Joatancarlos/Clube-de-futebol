import Teams from '../database/models/Teams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Matches from '../database/models/Matches';
import UtilsLeaderboard, { ILeaderBoardModel, teamsHomeOrAway } from '../utils/utilLeaderboard';

// tenho que retornar um objeto com as propriedades do ILeaderBoardModel.
//

export default class LeaderBoardService {
  static async getLeaderBoard(homeOrAway: string): Promise<ServiceResponse<unknown>> {
    const teams = await Teams.findAll({
      include: [{ model: Matches, as: `${homeOrAway}Team`, where: { inProgress: false } }],
    });
    const allBoards = teams.map((team: teamsHomeOrAway) => {
      const homeAway = homeOrAway === 'home' ? team.homeTeam : team.awayTeam;
      if (homeAway === undefined) throw new Error('homeAway is undefined');
      const intancesLeaderboard = new UtilsLeaderboard();
      const leaderboard = intancesLeaderboard.applicationMethods(homeAway, team.teamName);
      return leaderboard;
    });
    const sorted = LeaderBoardService.sortedLeaderboard(allBoards);
    return { status: 200, data: sorted };
  }

  static sortedLeaderboard(arr: ILeaderBoardModel[]): ILeaderBoardModel[] {
    const sortedArr = arr
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    return sortedArr;
  }
}
