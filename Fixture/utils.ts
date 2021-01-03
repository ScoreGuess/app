import {gql} from '@apollo/client';


export const SEARCH_FIXTURES = gql`  
  query getAllFixturesPredictions($offset: Int) {
    fixtures(offset: $offset) {
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
`

export const SEARCH_GROUP_FIXTURES = gql`
  query getAllFixturesPredictions($groupId: String, $offset: Int) {
    fixtures(groupId: $groupId, offset: $offset, status: FINISHED) {
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

export const SEARCH_PLANNED_FIXTURES = gql`
  query getAllFixture {
    fixtures(status: PLANNED) {
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
