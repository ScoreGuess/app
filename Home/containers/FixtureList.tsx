import React, {ReactNode} from 'react';
import {ActivityIndicator, Text, ScrollView, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {gql, useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';

const SEARCH_FIXTURES = gql`
  query getAllFixture {
    fixtures(matchDay: 1) {
      startDate
      id
      status
      prediction {
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

type Fixture = {
  id: string;
};

type FixtureListProps = {
  children: (fixture: Fixture) => ReactNode;
};

moment.locale('fr');
const GroupedFixtureList = ({children}: FixtureListProps) => {
  const {loading, data} = useQuery(SEARCH_FIXTURES);
  const fixtures = data?.fixtures ?? [];
  const groupingBy = fixtures.reduce((groupedFixtures, fixture) => {
    const day = fixture.startDate.substring(0, 10);
    const group = groupedFixtures[day] ?? [];
    return {...groupedFixtures, [day]: [...group, fixture]};
  }, {});
  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={tailwind('h-full')}>
      {Object.entries(groupingBy)
        .sort(([a], [b]) => {
          return (
            moment(a, 'DD-MM-YYYY').format('YYYYMMDD') -
            moment(b, 'DD-MM-YYYY').format('YYYYMMDD')
          );
        })
        .map(([day, fixtures]) => (
          <View key={day}>
            <View style={tailwind('bg-gray-200 p-4')}>
              <Text style={tailwind('text-center uppercase text-gray-600')}>
                {moment(day, 'DD-MM-YYYY').format('dddd DD MMMM')}
              </Text>
            </View>
            <View>{fixtures.map(children)}</View>
          </View>
        ))}
      {/* mt-16 is required to add some space between the keyboard and the last fixture view */}
      <View style={tailwind('mt-16')} />
    </ScrollView>
  );
};

export default GroupedFixtureList;
