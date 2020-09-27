import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import Card from '../../Shared/components/Card';

const GROUP_SEARCH = gql`
  query getResults {
    teams {
      id
      shortName
      fixtures {
        awayScore
        homeScore
        status
        awayTeam {
          shortName
          id
        }
        homeTeam {
          shortName
          id
        }
        id
      }
    }
  }
`;

const LeaderBoardItem = ({children}) => (
  <View style={tailwind('w-8 h-8 flex-row mr-1 justify-center items-center')}>
    <Text>{children}</Text>
  </View>
);

const ResultsView = () => {
  const {loading, data, error} = useQuery(GROUP_SEARCH);
  if (loading) {
    return <ActivityIndicator />;
  }
  const teams = data?.teams ?? [];
  const leaderboard = teams
    .map((team) => {
      const results = team.fixtures
        .filter((fixture) => fixture.status === 'FINISHED')
        .reduce(
          (results, fixture) => {
            if (fixture.awayScore === fixture.homeScore) {
              if (team.id === fixture.awayTeam.id) {
                return {
                  ...results,
                  matchsPlayed: ++results.matchsPlayed,

                  scoredGoals: results.scoredGoals + fixture.awayScore,
                  concededGoals: results.concededGoals + fixture.homeScore,
                  score: results.score + 1,
                  deuces: results.deuces + 1,
                };
              } else {
                return {
                  ...results,
                  matchsPlayed: ++results.matchsPlayed,

                  scoredGoals: results.scoredGoals + fixture.homeScore,
                  concededGoals: results.concededGoals + fixture.awayScore,
                  score: results.score + 1,
                  deuces: results.deuces + 1,
                };
              }
            }
            if (
              fixture.awayScore > fixture.homeScore &&
              team.id === fixture.awayTeam.id
            ) {
              return {
                ...results,
                matchsPlayed: ++results.matchsPlayed,

                scoredGoals: results.scoredGoals + fixture.awayScore,
                concededGoals: results.concededGoals + fixture.homeScore,
                score: results.score + 3,
                wins: results.wins + 1,
              };
            }
            if (
              fixture.homeScore > fixture.awayScore &&
              team.id === fixture.homeTeam.id
            ) {
              return {
                ...results,
                matchsPlayed: ++results.matchsPlayed,

                scoredGoals: results.scoredGoals + fixture.homeScore,
                concededGoals: results.concededGoals + fixture.awayScore,
                score: results.score + 3,
                wins: results.wins + 1,
              };
            }
            if (team.id === fixture.awayTeam.id) {
              return {
                ...results,
                matchsPlayed: ++results.matchsPlayed,

                defeats: ++results.defeats,
                scoredGoals: results.scoredGoals + fixture.awayScore,
                concededGoals: results.concededGoals + fixture.homeScore,
              };
            } else {
              return {
                ...results,
                matchsPlayed: ++results.matchsPlayed,
                defeats: ++results.defeats,
                scoredGoals: results.scoredGoals + fixture.homeScore,
                concededGoals: results.concededGoals + fixture.awayScore,
              };
            }
          },
          {
            score: 0,
            defeats: 0,
            wins: 0,
            deuces: 0,
            matchsPlayed: 0,
            scoredGoals: 0,
            concededGoals: 0,
          },
        );
      return {...team, results};
    })
    .sort((a, b) => {
      if (b.results.score - a.results.score !== 0) {
        return b.results.score - a.results.score;
      }
      return (
        b.results.scoredGoals -
        b.results.concededGoals -
        (a.results.scoredGoals - a.results.concededGoals)
      );
    });

  return (
    <View style={tailwind('p-2')}>
      <Card style={tailwind('bg-white p-2 pt-4')}>
        <ScrollView>
          <View style={tailwind('flex-row')}>
            <View>
              <View style={tailwind('h-8 flex-row pl-2 items-center')}>
                <Text>Équipe</Text>
              </View>
              {leaderboard.map((team, i) => (
                <View style={tailwind('flex-row my-1 mr-4')} key={i}>
                  <View
                    style={tailwind(
                      'h-8 flex-row justify-center items-center ',
                    )}>
                    <View
                      style={tailwind(
                        'h-8 w-8 mx-2 flex-row rounded-full justify-center items-center bg-gray-200',
                      )}>
                      <Text>{i + 1}</Text>
                    </View>
                    <View style={tailwind('px-1')}>
                      <Text>{team.shortName}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <ScrollView style={tailwind('flex-1')} horizontal>
              <View style={tailwind('mb-2')}>
                <View style={tailwind('flex-row')}>
                  <LeaderBoardItem>Pts</LeaderBoardItem>
                  <LeaderBoardItem>Mj</LeaderBoardItem>
                  <LeaderBoardItem>G</LeaderBoardItem>
                  <LeaderBoardItem>N</LeaderBoardItem>
                  <LeaderBoardItem>D</LeaderBoardItem>
                  <LeaderBoardItem>Bm</LeaderBoardItem>
                  <LeaderBoardItem>Bc</LeaderBoardItem>
                  <LeaderBoardItem>Db</LeaderBoardItem>
                </View>
                <View>
                  {leaderboard.map((team, i) => (
                    <View key={i} style={tailwind('flex-row my-1')}>
                      <LeaderBoardItem>{team.results.score}</LeaderBoardItem>
                      <LeaderBoardItem>
                        {team.results.matchsPlayed}
                      </LeaderBoardItem>
                      <LeaderBoardItem>{team.results.wins}</LeaderBoardItem>
                      <LeaderBoardItem>{team.results.deuces}</LeaderBoardItem>
                      <LeaderBoardItem>{team.results.defeats}</LeaderBoardItem>
                      <LeaderBoardItem>
                        {team.results.scoredGoals}
                      </LeaderBoardItem>
                      <LeaderBoardItem>
                        {team.results.concededGoals}
                      </LeaderBoardItem>
                      <LeaderBoardItem>
                        {team.results.scoredGoals - team.results.concededGoals}
                      </LeaderBoardItem>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

/*

        <View
          style={tailwind(
            'flex-row items-center justify-end pb-3 border-b-2 border-gray-200 mb-3',
          )}>
          <View style={tailwind('flex-1')}>
            <Text>Equipe</Text>
          </View>
          <View style={tailwind('flex-1')}>
            <ScrollView horizontal>
              <View
                style={tailwind(
                  'w-8 h-8 mr-1 flex-row justify-center items-center rounded-full ',
                )}>
                <Text>Pts</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>Mj</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>G</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>N</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>D</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>Bm</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 mr-1 flex-row justify-center items-center',
                )}>
                <Text>Bc</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row justify-center items-center',
                )}>
                <Text>Db</Text>
              </View>
            </ScrollView>
          </View>
        </View>
        <ScrollView>
          {leaderboard.map((team, i) => (
            <View key={team.id} style={tailwind('flex-row items-center my-1')}>
              <Text style={tailwind('mr-2')}>{i + 1}</Text>

              <Text style={tailwind('flex-1')}>{team.shortName}</Text>
              <View
                style={tailwind(
                  'bg-gray-200 w-8 h-8 mr-1 flex-row justify-center items-center rounded-full ',
                )}>
                <Text>{team.results.score}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>{team.results.matchsPlayed}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>{team.results.wins}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>{team.results.deuces}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>{team.results.defeats}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>{team.results.scoredGoals}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row mr-1 justify-center items-center',
                )}>
                <Text>{team.results.concededGoals}</Text>
              </View>
              <View
                style={tailwind(
                  'w-8 h-8 flex-row justify-center items-center',
                )}>
                <Text>
                  {team.results.scoredGoals - team.results.concededGoals}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
 */
export default ResultsView;
