import React from 'react';
import tailwind from 'tailwind-rn';
import {View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import PronosticFixturesSectionList from '../containers/PronosticFixturesSectionList';
import FixtureView from '../../Home/components/FixtureView';
import {Appbar, Colors} from 'react-native-paper';

const PronosticScreen = () => (
  <Screen>
    <View style={tailwind(' h-full justify-center w-full')}>
      <Appbar.Header
        style={{
          backgroundColor: Colors.white,
        }}>
        <Appbar.Content title="Pronostics" />
      </Appbar.Header>
      <View style={tailwind('flex-1')}>
        <PronosticFixturesSectionList>
          {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
        </PronosticFixturesSectionList>
      </View>
    </View>
  </Screen>
);

export default PronosticScreen;
