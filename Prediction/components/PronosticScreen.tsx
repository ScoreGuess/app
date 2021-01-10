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
import PronosticFixturesSectionList from '../containers/PronosticFixturesSectionList';
import FixtureView from '../../Home/components/FixtureView';
import ScreenHeader from '../../Shared/components/ScreenHeader';

const PronosticScreen = () => (
  <Screen>
    <View style={tailwind(' h-full justify-center w-full')}>
      <ScreenHeader>Pronostics</ScreenHeader>
      <View style={tailwind('flex-1')}>
        <PronosticFixturesSectionList>
          {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
        </PronosticFixturesSectionList>
      </View>
    </View>
  </Screen>
);

export default PronosticScreen;
