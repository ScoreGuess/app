export interface Prediction {
  homeScore: number;
  awayScore: number;
}
export interface Fixture {
  id: string;
  predictions: [any];
  homeTeam: any;
  awayTeam: any;
  status: 'PLANNED' | 'IN_PROGRESS' | 'FINISHED';
  prediction?: Prediction;
}
