import React, {ReactNode} from 'react';
import {ActivityIndicator, SectionList, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {useLazyQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';
import {groupByMatchDay} from '../../Shared/utils';
import FixtureSectionHeader from '../../Fixture/components/FixtureSectionHeader';
import FixtureListFooter from '../../Fixture/components/FixtureListFooter';
import {SEARCH_GROUP_FIXTURES} from '../../Fixture/utils';

moment.locale('fr');

const keyExtractor = (fixture: Types) => fixture.id;

type FixtureListProps = {
  children: (fixture: Types) => ReactNode;
  groupId: String | null;
};

const GroupedFixtureList = ({groupId, children}: FixtureListProps) => {
  const [state, setState] = React.useState([]);
  const [query, {loading, data, called, error}] = useLazyQuery(SEARCH_GROUP_FIXTURES);
  React.useEffect(() => {
    if (error != null) console.warn(error);
  }, [error]);

  React.useEffect(() => {
    const fixtures = data?.fixtures ?? [];
    setState((s) => {
      const newState = [...s, ...fixtures];
      newState.filter((item, index, a) => a.findIndex((b) => b.id === item.id));
      return newState;
    });
  }, [data]);

  React.useEffect(() => {
    query({
      variables: {
        groupId,
        offset: 0,
      },
    });
  }, []);

  const handleEndReached = () => {
    if (loading === false)
      query({
        variables: {
          groupId,
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
      renderSectionHeader={FixtureSectionHeader}
      renderItem={({item}) => children(item)}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.75}
      onEndReached={handleEndReached}
      ListFooterComponent={FixtureListFooter}
    />
  );
};

export default GroupedFixtureList;
