import React, {ReactNode} from 'react';
import {ActivityIndicator, SectionList, View, Text} from 'react-native';
import tailwind from 'tailwind-rn';
import {useLazyQuery} from '@apollo/client';
import moment from 'moment';
import FixtureView from '../../Home/components/FixtureView';

import 'moment/locale/fr';
import {groupByMatchDay} from '../../Shared/utils';
import FixtureSectionHeader from '../../Fixture/components/FixtureSectionHeader';
import FixtureListFooter from '../../Fixture/components/FixtureListFooter';
import {SEARCH_GROUP_FIXTURES} from '../../Fixture/utils';

moment.locale('fr');

const keyExtractor = (fixture) => fixture.id;
const ResultFixtureView = ({item}) => (
  <View style={{paddingLeft: 4, paddingRight: 4}}>
    <FixtureView fixture={item} />
  </View>
);
const Separator = () => <View style={{marginTop: 4}} />;
const FixturesSectionList = () => {
  const [state, setState] = React.useState([]);
  const [query, {loading, data, error, called}] = useLazyQuery(
    SEARCH_GROUP_FIXTURES,
  );
  React.useEffect(() => {
    if (error != null) console.warn(error);
  }, [error]);

  React.useEffect(() => {
    const fixtures = data?.fixtures ?? [];
    console.log(fixtures.length);
    setState((s) => {
      const newState = [...s, ...fixtures];
      newState.filter((item, index, a) => a.findIndex((b) => b.id === item.id));
      return newState;
    });
  }, [data]);

  React.useEffect(() => {
    query({
      variables: {
        offset: 0,
      },
    });
  }, []);

  const handleEndReached = () => {
    if (loading === false)
      query({
        variables: {
          offset: state.length,
        },
      });
  };
  return !called && loading ? (
    <View style={tailwind('h-full items-center justify-center')}>
      <ActivityIndicator />
    </View>
  ) : (
    <SectionList
      sections={groupByMatchDay(state)}
      stickySectionHeadersEnabled={true}
      renderSectionHeader={FixtureSectionHeader}
      renderItem={ResultFixtureView}
      ItemSeparatorComponent={Separator}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.75}
      onEndReached={handleEndReached}
      refreshing={loading}
      ListFooterComponent={FixtureListFooter}
    />
  );
};

export default FixturesSectionList;
