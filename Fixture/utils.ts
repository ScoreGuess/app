import {gql} from '@apollo/client';

export const SEARCH_FIXTURES = gql`
  query getAllFixturesPredictions($after: String) {
    fixtures(after: $after) {
      startDate
      id
      status
      competition {
        name
      }
      matchDay
      predictions {
        attributes {
          type
        }
        homeScore
        awayScore
        user {
          id
          displayName
        }
      }
      prediction {
        attributes {
          type
        }
        homeScore
        awayScore
      }
      homeScore
      awayScore
      awayTeam {
        shortName
        id
        logo
      }
      homeTeam {
        shortName
        id
        logo
      }
    }
  }
`;

export const SEARCH_GROUP_FIXTURE = gql`
  query getFixturePrediction($groupId: String!, $fixtureId: String!) {
    fixture(groupId: $groupId, fixtureId: $fixtureId) {
      predictions {
        user {
          id
          displayName
        }
        homeScore
        awayScore
        attributes {
          type
        }
      }
    }
  }
`;

export const SEARCH_GROUP_FIXTURES = gql`
  query getAllFixturesPredictions($groupId: String, $after: String) {
    fixtures(groupId: $groupId, after: $after, status: FINISHED) {
      startDate
      id
      status
      competition {
        name
      }
      matchDay
      homeScore
      awayScore
      awayTeam {
        shortName
        id
        logo
      }
      homeTeam {
        shortName
        id
        logo
      }
    }
  }
`;

export const SEARCH_PLANNED_FIXTURES = gql`
  query getAllFixture {
    fixtures(status: [PLANNED, IN_PROGRESS]) {
      startDate
      id
      status
      competition {
        id
        name
      }
      matchDay
      prediction {
        attributes {
          type
        }
        homeScore
        awayScore
      }
      homeScore
      awayScore
      awayTeam {
        shortName
        id
        logo
      }
      homeTeam {
        shortName
        id
        logo
      }
    }
  }
`;
