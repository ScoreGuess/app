import React, {ReactNode, useEffect} from 'react';
import {ActivityIndicator, Animated, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {useLazyQuery} from '@apollo/client';
import moment from 'moment';
import 'moment/locale/fr';
import {groupByMatchDay} from '../../Shared/utils';
import FixtureSectionHeader from '../../Fixture/components/FixtureSectionHeader';
import FixtureListFooter from '../../Fixture/components/FixtureListFooter';
import {SEARCH_GROUP_FIXTURES} from '../../Fixture/utils';
import {GROUP_NAVIGATION_HEADER_HEIGHT} from '../../Group/components/GroupNavigation';

moment.locale('fr');

const keyExtractor = (fixture: Types) => fixture.id;

type FixtureListProps = {
  children: (fixture: Types) => ReactNode;
  groupId: String | null;
};

const useQueryGroupFixturesOnScroll = (groupId) => {
  const [state, setState] = React.useState([]);
  const [query, {loading, data, called, error}] = useLazyQuery(
    SEARCH_GROUP_FIXTURES,
  );

  useEffect(() => {
    if (error != null) console.warn(error);
  }, [error]);

  useEffect(() => {
    const fixtures = data?.fixtures ?? [];
    setState((s) => {
      return [...s, ...fixtures];
    });
  }, [data]);

  React.useEffect(() => {
    query({
      variables: {
        groupId,
        offset: 0,
      },
    });
  }, [groupId]);

  return {
    fixtures: state,
    called,
    loading,
    query,
  };
};
const GroupedFixtureList = ({
  groupId,
  children,
  onScroll,
  y,
}: FixtureListProps) => {
  const {fixtures, called, loading, query} = useQueryGroupFixturesOnScroll(
    groupId,
  );
  const translateY = y.interpolate({
    inputRange: [0, GROUP_NAVIGATION_HEADER_HEIGHT],
    outputRange: [GROUP_NAVIGATION_HEADER_HEIGHT, 0],
    extrapolateLeft: 'clamp',
  });

  const handleEndReached = () => {
    if (!loading)
      query({
        variables: {
          groupId,
          after: fixtures?.[fixtures.length - 1]?.id,
        },
      });
  };
  return !called && loading ? (
    <View style={tailwind('h-full items-center justify-center')}>
      <ActivityIndicator />
    </View>
  ) : (
    <Animated.SectionList
      style={{
        transform: [
          {
            translateY,
          },
        ],
      }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      bounces={false}
      sections={groupByMatchDay(fixtures)}
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
