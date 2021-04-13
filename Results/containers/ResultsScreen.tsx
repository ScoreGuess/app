import React from 'react';
import tailwind from 'tailwind-rn';
import {View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import {Appbar, Colors} from 'react-native-paper';
import FixturesSectionList from './FixturesSectionList';

const ResultsScreen = () => {
  return (
    <Screen>
      <View style={tailwind(' h-full justify-center w-full')}>
          <Appbar.Header style={{
            backgroundColor: Colors.white
        }} >
          <Appbar.Content title="Résultats" />
        </Appbar.Header>
        <FixturesSectionList />
      </View>
    </Screen>
  );
};

export default ResultsScreen;
