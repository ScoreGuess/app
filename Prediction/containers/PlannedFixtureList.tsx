import React, {ReactNode, useCallback, useEffect} from 'react';
import {ActivityIndicator, AppState, SectionList} from 'react-native';
import {useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';
import {groupByMatchDay} from '../../Shared/utils';
import {SEARCH_PLANNED_FIXTURES} from '../../Fixture/utils';
import {Fixture} from '../../Fixture/types';
import FixtureSectionHeader from '../../Fixture/components/FixtureSectionHeader';

moment.locale('fr');

const GroupedFixtureList = ({children}: FixtureListProps) => {
  const {loading, data, refetch: _refetch} = useQuery(SEARCH_PLANNED_FIXTURES);
  // 👇  https://github.com/apollographql/apollo-client/issues/6816
  const refetch = useCallback(() => {
    setTimeout(() => _refetch(), 0);
  }, [_refetch]);

  const fixtures = data?.fixtures ?? [];
  console.log(fixtures)
  const [refreshing, setRefreshing] = React.useState(false);

  const handleChange = useCallback(
    async (appStateChange) => {
      if (appStateChange !== 'active') return;
      setRefreshing(true);
      try {
        await refetch();
        setRefreshing(false);
      } catch (e) {
        console.warn(e);
      }
    },
    [setRefreshing, refetch],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, [handleChange]);

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
    <FixtureList
      fixtures={fixtures}
      refreshing={refreshing}
      onRefresh={onRefresh}>
      {children}
    </FixtureList>
  );
};

interface FixtureListProps {
  fixtures: Fixture[];
  children: (fixture: Fixture) => ReactNode;
  onRefresh: () => void;
  refreshing: boolean;
}

const FixtureList = ({
  fixtures,
  children,
  onRefresh,
  refreshing,
}: FixtureListProps) => {
  const entries = groupByMatchDay(fixtures);

  const renderItem = ({item}: {item: Fixture}) => children(item);

  return (
    <SectionList
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderSectionHeader={FixtureSectionHeader}
      renderItem={renderItem}
      sections={entries}
    />
  );
};

export default GroupedFixtureList;
