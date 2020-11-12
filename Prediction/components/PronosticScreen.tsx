import React from 'react';
import tailwind from 'tailwind-rn';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import Screen from '../../Shared/components/Screen';
import PlannedFixtureList from '../containers/PlannedFixtureList';
import FixtureView from '../../Home/components/FixtureView';

const PronosticScreen = () => (
  <Screen>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={tailwind(' h-full justify-center w-full')}>
        <View style={tailwind('mt-4 mb-2 px-4')}>
          <Text style={tailwind('text-xl font-bold text-red-600')}>
            Pronostics
          </Text>
        </View>
        <View style={tailwind('flex-1')}>
          <PlannedFixtureList>
            {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
          </PlannedFixtureList>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Screen>
);

export default PronosticScreen;
