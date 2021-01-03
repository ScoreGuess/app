export interface Group {
  id: string;
  participants: [Participant];
}

export interface Participant {
  user: {
    id: string;
    displayName: string;
  };
  homeScore: number;
  awayScore: number;
}

export interface ParticipantWithScore extends Participant {
  score: number;
}
