import React, {ReactNode, useCallback, useEffect} from 'react';
import {AppState, SectionList, View} from 'react-native';
import {ActivityIndicator, Headline, Paragraph} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';
import {groupByMatchDay} from '../../Shared/utils';
import {SEARCH_PLANNED_FIXTURES} from '../../Fixture/utils';
import {Fixture} from '../../Fixture/types';
import FixtureSectionHeader from '../../Fixture/components/FixtureSectionHeader';

moment.locale('fr');

interface PronosticFixturesSectionListProps {
  children: (fixture: Fixture) => ReactNode;
}

const PronosticFixturesSectionList = ({
  children,
}: PronosticFixturesSectionListProps) => {
  const {loading, data, error, refetch: _refetch} = useQuery(
    SEARCH_PLANNED_FIXTURES,
  );
  // 👇  https://github.com/apollographql/apollo-client/issues/6816
  const refetch = useCallback(() => {
    setTimeout(() => _refetch(), 0);
  }, [_refetch]);
  console.log(error);
  const fixtures = data?.fixtures ?? [];
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
  const entries = groupByMatchDay(fixtures);

  const renderItem = ({item}: {item: Fixture}) => children(item);
  if (loading)
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator />
        <Paragraph style={{marginTop: 20}}>
          Chargement des matchs à venir...
        </Paragraph>
      </View>
    );

  return fixtures.length === 0 ? (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20,
      }}>
      <Headline style={{textAlign: 'center'}}>
        Hum, les prochains matchs ne sont pas encore disponibles...
      </Headline>
      <Paragraph style={{marginTop: 20}}>
        Reviens plus tard pour saisir tes pronos
      </Paragraph>
    </View>
  ) : (
    <SectionList
      onRefresh={onRefresh}
      stickySectionHeadersEnabled={true}
      refreshing={refreshing}
      renderSectionHeader={FixtureSectionHeader}
      renderItem={renderItem}
      sections={entries}
    />
  );
};

export default PronosticFixturesSectionList;
