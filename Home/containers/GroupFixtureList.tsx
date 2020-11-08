import React, {ReactNode, useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  ScrollView,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import {gql, useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';

export const SEARCH_GROUP_FIXTURES = gql`
  query getAllFixturesPredictions($matchDay: Int, $groupId: String) {
    fixtures(matchDay: $matchDay, groupId: $groupId) {
      startDate
      id
      status
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

type Fixture = {
  id: string;
};

type FixtureListProps = {
  children: (fixture: Fixture) => ReactNode;
  matchDay: number | null;
};

moment.locale('fr');

const GroupedFixtureList = ({
  matchDay,
  groupId,
  children,
}: FixtureListProps) => {
  const {loading, data, error, refetch} = useQuery(SEARCH_GROUP_FIXTURES, {
    variables: {
      matchDay,
      groupId,
    },
  });
  React.useEffect(() => {
    if (error != null) console.warn(error);
  }, [error]);

  const fixtures = data?.fixtures ?? [];

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch {
      console.warn('something went wrong while refetching fixtures');
    }
    setRefreshing(false);
  }, [refetch]);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <Day fixtures={fixtures} refreshing={refreshing} onRefresh={onRefresh}>
      {children}
    </Day>
  );
};

const Day = ({fixtures, children, onRefresh, refreshing}) => {
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
      {Object.entries(groupingBy)
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
                style={tailwind('text-left uppercase font-bold text-gray-800')}>
                {moment(day, 'YYYY-MM-DD').format('dddd DD MMMM')}
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
