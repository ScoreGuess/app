import React, {ReactNode} from 'react';
import {ActivityIndicator, Text, ScrollView, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {gql, useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';
import auth from '@react-native-firebase/auth';
const SEARCH_FIXTURES = gql`
  query getAllFixture($userId: String!) {
    fixtures(matchDay: 1, userId: $userId) {
      startDate
      id
      prediction {
        homeScore
        awayScore
      }
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

type Fixture = {
  id: string;
};

type FixtureListProps = {
  children: (fixture: Fixture) => ReactNode;
};

moment.locale('fr');
const GroupedFixtureList = ({children}: FixtureListProps) => {
  const {loading, data} = useQuery(SEARCH_FIXTURES, {
    variables: {
      userId: auth().currentUser.uid,
    },
  });
  const fixtures = data?.fixtures ?? [];

  const groupingBy = fixtures.reduce((groupedFixtures, fixture) => {
    const day = fixture.startDate.substring(0, 10);
    const group = groupedFixtures[day] ?? [];
    return {...groupedFixtures, [day]: [...group, fixture]};
  }, {});
  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={tailwind(' h-full')}>
      {Object.entries(groupingBy).map(([day, fixtures]) => (
        <View key={day}>
          <View style={tailwind('bg-gray-200 p-4')}>
            <Text style={tailwind('text-center uppercase text-gray-600')}>
              {moment(day, 'DD-MM-YYYY').format('dddd DD MMMM')}
            </Text>
          </View>
          <View>{fixtures.map(children)}</View>
        </View>
      ))}
    </ScrollView>
  );
};
//(fixture) => children(fixture))}

export default GroupedFixtureList;
