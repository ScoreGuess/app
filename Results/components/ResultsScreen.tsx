import Screen from '../../Shared/components/Screen';
import {Text, View} from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import ResultsView from '../containers/Results';

const ResultsScreen = ({}) => {
  return (
    <Screen>
      <ResultsView />
    </Screen>
  );
};

export default ResultsScreen;
