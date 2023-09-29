import Teams from '../database/models/Teams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Matches from '../database/models/Matches';
import UtilsLeaderboard, { teamsHomeOrAway } from '../utils/utilLeaderboard';

// tenho que retornar um objeto com as propriedades do ILeaderBoardModel.
//

export default class LeaderBoardService {
  static async getLeaderBoard(homeOrAway: string): Promise<ServiceResponse<unknown>> {
    const teams = await Teams.findAll({
      include: [{ model: Matches, as: `${homeOrAway}Team`, where: { inProgress: false } }],
    });
    // ajeitar as tipagens do teams
    const allBoards = teams.map((team: teamsHomeOrAway) => {
      const homeAway = homeOrAway === 'home' ? team.homeTeam : team.awayTeam;
      if (homeAway === undefined) throw new Error('homeAway is undefined');
      const intancesLeaderboard = new UtilsLeaderboard();
      return intancesLeaderboard.applicationMethods(homeAway, team.teamName);
    });
    return { status: 200, data: allBoards };
  }
}
