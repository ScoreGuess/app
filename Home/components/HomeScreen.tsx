import React, {useEffect} from 'react';
import tailwind from 'tailwind-rn';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import Screen from '../../Shared/components/Screen';
import FixtureList from '../containers/FixtureList';
import FixtureView from './FixtureView';
import {gql, useQuery} from '@apollo/client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
const CURRENT_MATCH_DAY = gql`
  query getCurrentMatchDay {
    currentMatchDay
  }
`;
const RoundedButton = ({onPress, icon}) => (
  <TouchableHighlight
    style={tailwind(
      'w-12 h-12 items-center justify-center bg-red-200 rounded-full',
    )}
    onPress={onPress}>
    <FontAwesomeIcon icon={icon} color={'tomato'} size={12} />
  </TouchableHighlight>
);

const SelectedMatchDayView = ({matchDay}) => (
  <View style={tailwind('flex-1 items-center')}>
    <Text style={tailwind('text-xl font-bold  text-red-600')}>
      {matchDay === 1 ? `${matchDay}ère` : `${matchDay}ème`}
      &nbsp;Journée
    </Text>
  </View>
);

const HomeScreen = () => {
  const {loading, data} = useQuery(CURRENT_MATCH_DAY);
  const currentMatchDay = data?.currentMatchDay;

  const [matchDay, setMatchDay] = React.useState(currentMatchDay);
  useEffect(() => {
    if (currentMatchDay != null) setMatchDay(currentMatchDay);
  }, [currentMatchDay]);

  if (loading === true)
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );

  const onPressPrevious = () => setMatchDay((s) => (s <= 1 ? 1 : --s));
  const onPressNext = () =>
    setMatchDay((s) => (s >= currentMatchDay ? s : ++s));

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={tailwind(' h-full justify-center w-full')}>
          <View style={tailwind('flex-row items-center p-4')}>
            <RoundedButton onPress={onPressPrevious} icon={faArrowLeft} />
            <SelectedMatchDayView matchDay={matchDay} />
            <RoundedButton onPress={onPressNext} icon={faArrowRight} />
          </View>
          <View style={tailwind('flex-1')}>
            <FixtureList matchDay={matchDay}>
              {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
            </FixtureList>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default HomeScreen;
