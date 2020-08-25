import Screen from '../../Shared/components/Screen';
import {Text, View} from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';

const ResultsScreen = ({}) => {
  return (
    <Screen>
      <View style={tailwind('h-full mt-12 p-6')}>
        <Text style={tailwind('text-2xl font-bold')}>
          Désolé mais cette page n'est pas encore prête 😅
        </Text>
        <Text style={tailwind('mt-6 text-red-600 text-2xl font-bold')}>
          Promis on se dépêche 😇
        </Text>
      </View>
    </Screen>
  );
};

export default ResultsScreen;
