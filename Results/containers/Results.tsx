import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import LeaderBoardHero from '../components/LeaderBoardHero';
import LeaderBoardRow from '../components/LeaderBoardRow';
import {computePoints} from '../utils';

const GROUP_SEARCH = gql`
  query groupSearch {
    groups {
      id
      participants {
        id
        email
        displayName
        predictions {
          attributes {
            type
          }
        }
      }
    }
  }
`;

const ResultsView = () => {
  const {loading, data, error} = useQuery(GROUP_SEARCH);
  if (loading) {
    return <ActivityIndicator />;
  }
  const [group] = data?.groups ?? [{participants: []}];
  const [first, ...rest] = group.participants
    .map((participant) => ({
      ...participant,
      points: computePoints(participant),
    }))
    .sort((a, b) => b.points - a.points);
  if (first == null) return <Text>oups</Text>;
  return (
    <ScrollView style={tailwind('p-4')}>
      <View>
        <LeaderBoardHero participant={first} />
        {rest.map((participant, i) => (
          <LeaderBoardRow
            key={participant.id}
            participant={participant}
            index={i}
          />
        ))}
      </View>
      <View style={tailwind('mt-16')} />
    </ScrollView>
  );
};
export default ResultsView;
