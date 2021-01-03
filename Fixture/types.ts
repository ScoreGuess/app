export interface Fixture {
  id: string;
  predictions: [any];
  homeTeam: any;
  awayTeam: any;
  status: 'PLANNED' | 'IN-PROGRESS' | 'FINISHED';
  prediction?: {
    homeScore: number;
    awayScore: number;
  };
}
