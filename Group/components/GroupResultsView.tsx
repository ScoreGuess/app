import React, {useEffect} from 'react';
import tailwind, {getColor} from 'tailwind-rn';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import {gql, useQuery} from '@apollo/client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import GroupFixtureView from '../../Home/components/GroupFixtureView';
import GroupedFixtureList from '../../Home/containers/GroupFixtureList';

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

const SelectedMatchDayView = ({matchDay}) => (
  <View style={tailwind('flex-1 items-center')}>
    <Text style={tailwind('w-full text-center font-bold text-red-600')}>
      {matchDay === 1 ? `${matchDay}ère` : `${matchDay}ème`}
      &nbsp;Journée
    </Text>
  </View>
);

const GroupResultsView = ({group}) => {
  const {loading, data} = useQuery(CURRENT_MATCH_DAY);
  const lastDay = data?.currentMatchDay - 1;

  // set to previous day
  const [matchDay, setMatchDay] = React.useState(lastDay);
  useEffect(() => {
    if (lastDay != null) {
      setMatchDay(lastDay);
    }
  }, [setMatchDay, lastDay]);

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  const onPressPrevious = () => setMatchDay((s) => (s <= 1 ? 1 : --s));
  const onPressNext = () => setMatchDay((s) => (s >= lastDay ? s : ++s));

  return (
    <View style={tailwind(' h-full justify-center w-full')}>
      <View
        style={tailwind(
          'flex-row items-center p-4 border-b-2 border-gray-200',
        )}>
        <RoundedButton
          onPress={onPressPrevious}
          disabled={matchDay <= 1}
          icon={faArrowLeft}
        />
        <SelectedMatchDayView matchDay={matchDay} />
        <RoundedButton
          onPress={onPressNext}
          disabled={matchDay >= lastDay}
          icon={faArrowRight}
        />
      </View>
      <View style={tailwind('flex-1')}>
        <GroupedFixtureList matchDay={matchDay} groupId={group.id}>
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
