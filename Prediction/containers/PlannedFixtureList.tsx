import React, {ReactNode, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  ScrollView,
  View,
  AppState,
} from 'react-native';
import tailwind from 'tailwind-rn';
import {gql, useLazyQuery, useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';

export const SEARCH_FIXTURES = gql`
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

type Fixture = {
  id: string;
};

type FixtureListProps = {
  children: (fixture: Fixture) => ReactNode;
};

moment.locale('fr');

const GroupedFixtureList = ({children}: FixtureListProps) => {
  const {loading, data, refetch: _refetch} = useQuery(SEARCH_FIXTURES);
  // 👇  https://github.com/apollographql/apollo-client/issues/6816
  const refetch = useCallback(() => {
    setTimeout(() => _refetch(), 0);
  }, [_refetch]);

  const fixtures = data?.fixtures ?? [];
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  const handleChange = async (appStateChange) => {
    if (appStateChange !== 'active') return;
    setRefreshing(true);
    try {
      await refetch();
      setRefreshing(false);
    } catch (e) {
      console.warn(e);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
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
  const groupedByCompetition = fixtures.reduce((groupedFixtures, fixture) => {
    const {name} = fixture.competition;
    const group = groupedFixtures[name] ?? {};
    const matchDay = fixture.matchDay;
    const fixturesByMatchDay = group[matchDay] ?? [];
    return {
      ...groupedFixtures,
      [name]: {
        ...groupedFixtures[name],
        [matchDay]: [...fixturesByMatchDay, fixture],
      },
    };
  }, {});

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {Object.entries(groupedByCompetition).map(([competition, days]) => (
        <View key={competition}>
          <View style={tailwind('px-4 pt-8 pb-4')}>
            <Text
              style={tailwind('text-left uppercase font-bold text-gray-800')}>
              {competition}
            </Text>
          </View>
          <View>
            {Object.entries(days).map(([day, fixtures]) => (
              <View key={day}>
                <View style={tailwind('p-4')}>
                  <Text style={tailwind('text-left uppercase text-gray-800')}>
                    {day}ème journée
                  </Text>
                </View>
                <View>{fixtures.map(children)}</View>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* mt-16 is required to add some space between the keyboard and the last fixture view */}
      <View style={tailwind('mt-16')} />
    </ScrollView>
  );
};

export default GroupedFixtureList;
