import React, {useEffect} from 'react';
import tailwind, {getColor} from 'tailwind-rn';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import {gql, useQuery} from '@apollo/client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import GroupFixtureView from '../../Home/components/GroupFixtureView';
import GroupedFixtureList from '../../Home/containers/GroupFixtureList';
import moment from 'moment';

const CURRENT_MATCH_DAY = gql`
  query getCurrentMatchDay {
    currentMatchDay
  }
`;
const RoundedButton = ({onPress, icon, disabled}) => (
  <Pressable
    style={tailwind(
      `w-8 h-8 items-center justify-center ${
        disabled === true ? 'bg-gray-200' : 'bg-red-200'
      }
       rounded-full`,
    )}
    onPress={onPress}
    disabled={disabled}>
    <FontAwesomeIcon
      icon={icon}
      color={disabled === true ? getColor('gray-500') : getColor('red-600')}
      size={8}
    />
  </Pressable>
);

const SelectedMatchDayView = ({day}) => (
  <View style={tailwind('flex-1 items-center')}>
    <Text style={tailwind('w-full text-center font-bold text-red-600')}>
      Semaine du {moment(day).format('L')}
    </Text>
  </View>
);

const GroupResultsView = ({group}) => {
  const firstDayOfThisWeek = moment().isoWeekday(1);
  // set to previous day
  const [current, setCurrent] = React.useState(
    firstDayOfThisWeek.format('YYYY-MM-DD'),
  );
  const onPressPrevious = () => {
    setCurrent((s) => {
      return moment(s).subtract('1', 'week');
    });
  };
  const onPressNext = () =>
    setCurrent((s) => {
      return moment(s).add('1', 'week');
    });

  return (
    <View style={tailwind(' h-full justify-center w-full')}>
      <View
        style={tailwind(
          'flex-row items-center p-4 border-b-2 border-gray-200',
        )}>
        <RoundedButton
          onPress={onPressPrevious}
          disabled={moment(current).isBefore(moment(group.createdAt))}
          icon={faArrowLeft}
        />
        <SelectedMatchDayView day={current} />
        <RoundedButton
          onPress={onPressNext}
          disabled={moment(current).isSameOrAfter(firstDayOfThisWeek, 'day')}
          icon={faArrowRight}
        />
      </View>
      <View style={tailwind('flex-1')}>
        <GroupedFixtureList
          groupId={group.id}
          start={moment(current).format('YYYY-MM-DD')}>
          {(fixture) => (
            <GroupFixtureView
              key={fixture.id}
              fixture={fixture}
              group={group}
            />
          )}
        </GroupedFixtureList>
      </View>
    </View>
  );
};

export default GroupResultsView;
