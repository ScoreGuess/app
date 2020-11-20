import React from 'react';
import tailwind, {getColor} from 'tailwind-rn';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import Screen from '../../Shared/components/Screen';
import FixtureList from '../containers/FixtureList';
import FixtureView from './FixtureView';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const RoundedButton = ({onPress, icon, disabled}) => (
  <Pressable
    style={tailwind(
      `w-12 h-12 items-center justify-center ${
        disabled === true ? 'bg-gray-200' : 'bg-red-200'
      }
       rounded-full`,
    )}
    onPress={onPress}
    disabled={disabled}>
    <FontAwesomeIcon
      icon={icon}
      color={disabled === true ? getColor('gray-500') : getColor('red-600')}
      size={12}
    />
  </Pressable>
);

const SelectedMatchDayView = ({matchDay}) => (
  <View style={tailwind('flex-1 items-center')}>
    <Text style={tailwind('w-full text-center text-xl font-bold text-red-600')}>
      Semaine du {moment(matchDay).format('L')}
    </Text>
  </View>
);

const PreviousDaysScreen = () => {
  // set to previous day
  const [matchDay, setMatchDay] = React.useState(
    moment().startOf('week').isoWeekday(1).format('YYYY-MM-DD'),
  );

  const onPressPrevious = () =>
    setMatchDay((s) => moment(s).subtract(1, 'week').format('YYYY-MM-DD'));
  const onPressNext = () =>
    setMatchDay((s) => moment(s).add(1, 'week').format('YYYY-MM-DD'));

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={tailwind(' h-full justify-center w-full')}>
          <View style={tailwind('flex-row items-center p-4')}>
            <RoundedButton
              onPress={onPressPrevious}
              disabled={false}
              icon={faArrowLeft}
            />
            <SelectedMatchDayView matchDay={matchDay} />
            <RoundedButton
              onPress={onPressNext}
              disabled={false}
              icon={faArrowRight}
            />
          </View>
          <View style={tailwind('flex-1')}>
            <FixtureList start={matchDay}>
              {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
            </FixtureList>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default PreviousDaysScreen;
