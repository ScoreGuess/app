import {Prediction} from '../types';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';

interface PronosticViewProps {
  prediction: Prediction;
}
const PronosticView = ({prediction}: PronosticViewProps) => (
  <View style={tailwind('flex-row justify-between py-4 mt-4')}>
    <Text style={tailwind('font-bold flex-1')}>Pronostic</Text>
    <View style={tailwind('flex-row')}>
      <Text style={tailwind('font-bold')}>{prediction.homeScore}</Text>
      <Text style={tailwind('font-bold')}>&nbsp;&ndash;&nbsp;</Text>
      <Text style={tailwind('font-bold')}>{prediction.awayScore}</Text>
    </View>
  </View>
);

export default PronosticView;
