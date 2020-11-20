import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import {gql, useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';

export const SEARCH_FIXTURES = gql`
  query getAllFixture($start: String, $end: String) {
    fixtures(start: $start, end: $end) {
      startDate
      id
      status
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

type Fixture = {
  id: string;
};

type FixtureListProps = {
  children: (fixture: Fixture) => ReactNode;
  start: string | null;
};

moment.locale('fr');

const GroupedFixtureList = ({start, children}: FixtureListProps) => {
  const {loading, data, error, refetch} = useQuery(SEARCH_FIXTURES, {
    variables: {
      start,
      end: moment(start, 'YYYY-MM-DD').add(1, 'week').format('YYYY-MM-DD'),
    },
  });
  React.useEffect(() => {
    if (error != null) console.warn(error);
    console.log(error);
  }, [error]);

  const fixtures = data?.fixtures ?? [];

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.log(e.message);
      console.warn('something went wrong while refetching fixtures');
    }
    setRefreshing(false);
  }, [refetch]);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <Week fixtures={fixtures} refreshing={refreshing} onRefresh={onRefresh}>
      {children}
    </Week>
  );
};

const Week = ({fixtures, children, onRefresh, refreshing}) => {
  const groupingBy = fixtures.reduce((groupedFixtures, fixture) => {
    const day = fixture.startDate.substring(0, 10);
    const group = groupedFixtures[day] ?? [];
    return {...groupedFixtures, [day]: [...group, fixture]};
  }, {});
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {fixtures.length === 0 ? (
        <View>
          <Text>Pas de match sur cette semaine</Text>
        </View>
      ) : (
        Object.entries(groupingBy)
          .sort(([a], [b]) => {
            return (
              moment(a, 'YYYY-MM-DD').format('YYYYMMDD') -
              moment(b, 'YYYY-MM-DD').format('YYYYMMDD')
            );
          })
          .map(([day, fixtures]) => (
            <View key={day}>
              <View style={tailwind('px-4 pt-8 pb-4')}>
                <Text
                  style={tailwind(
                    'text-left uppercase font-bold text-gray-800',
                  )}>
                  {moment(day, 'YYYY-MM-DD').format('dddd DD MMMM')}
                </Text>
              </View>
              <View>{fixtures.map(children)}</View>
            </View>
          ))
      )}
      {/* mt-16 is required to add some space between the keyboard and the last fixture view */}
      <View style={tailwind('mt-16')} />
    </ScrollView>
  );
};

export default GroupedFixtureList;
