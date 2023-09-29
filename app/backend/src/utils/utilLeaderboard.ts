import ImatchCreated from '../Interfaces/ImatchCreated';

export interface ILeaderBoardModel {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  efficiency: number;
  goalsBalance: number;
}

export type teamsHomeOrAway = {
  id: number;
  teamName: string;
  homeTeam?: ImatchCreated[];
  awayTeam?: ImatchCreated[];
};

export default class UtilsLeaderboard {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private efficiency: number;
  private goalsBalance: number;

  constructor() {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.efficiency = 0;
    this.goalsBalance = 0;
  }

  getPoints(goals: number, goalsAgainst: number): void {
    if (goals > goalsAgainst) {
      this.totalPoints += 3;
    } else if (goals === goalsAgainst) {
      this.totalPoints += 1;
    }
  }

  getVictory(goals: number, goalsAgainst: number): void {
    if (goals > goalsAgainst) this.totalVictories += 1;
  }

  getDraw(goals: number, goalsAgainst: number): void {
    if (goals === goalsAgainst) this.totalDraws += 1;
  }

  getLoss(goals: number, goalsAgainst: number): void {
    if (goals < goalsAgainst) this.totalLosses += 1;
  }

  returnLeaderboard(): ILeaderBoardModel {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      efficiency: Number(this.efficiency.toFixed(2)),
      goalsBalance: this.goalsBalance,
    };
  }

  applicationMethods(arrHomeAway: ImatchCreated[], name: string): ILeaderBoardModel {
    this.name = name;
    arrHomeAway.forEach((team) => {
      const { homeTeamGoals, awayTeamGoals } = team;
      this.totalGames += 1;
      this.getPoints(homeTeamGoals, awayTeamGoals);
      this.getVictory(homeTeamGoals, awayTeamGoals);
      this.getDraw(homeTeamGoals, awayTeamGoals);
      this.getLoss(homeTeamGoals, awayTeamGoals);
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
      this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100);
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
    });
    return this.returnLeaderboard();
  }
}
