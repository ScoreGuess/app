import React from 'react';
import tailwind from 'tailwind-rn';
import {View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import FixtureView from '../../Home/components/FixtureView';
import FixturesSectionList from './FixturesSectionList';
import ScreenHeader from '../../Shared/components/ScreenHeader';

const ResultsScreen = () => {
  return (
    <Screen>
      <View style={tailwind(' h-full justify-center w-full')}>
        <ScreenHeader>Résultats</ScreenHeader>
        <FixturesSectionList>
          {(fixture) => <FixtureView fixture={fixture} />}
        </FixturesSectionList>
      </View>
    </Screen>
  );
};

export default ResultsScreen;
