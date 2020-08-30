import React from 'react';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const GROUP_SEARCH = gql`
  query groupSearch {
    groups {
      id
      participants {
        id
        email
        predictions {
          attributes {
            type
          }
        }
      }
    }
  }
`;
const computePoints = (user) =>
  Object.values(user.predictions ?? {})
    .flatMap((prediction) => prediction.attributes)
    .map((attribute) => attribute.type)
    .reduce((sum, type) => {
      if (type === 'EXACT_SCORE') return sum + 3;
      else if (type === 'EXACT_RESULT') return sum + 1;
      return sum;
    }, 0);

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
    <View style={tailwind('p-4')}>
      <View style={tailwind('py-4 flex-row justify-between items-center')}>
        <View style={tailwind('flex-row justify-between items-center')}>
          <View style={tailwind('bg-red-200 p-2 rounded-full mr-4')}>
            <FontAwesomeIcon icon={faTrophy} color={'tomato'} size={24} />
          </View>
          <Text style={tailwind('text-lg font-bold text-red-600')}>
            {first.email}
          </Text>
        </View>
        <Text>{first.points}</Text>
      </View>
      <View>
        {rest.map((participant) => (
          <View
            style={tailwind('flex-row py-4 justify-between')}
            key={participant.id}>
            <Text>{participant.email}</Text>
            <Text>{participant.points}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default ResultsView;
