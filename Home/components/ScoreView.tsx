import React from 'react';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';

const ScoreView = ({fixture}) => (
  <View style={tailwind('flex-row')}>
    <Text style={tailwind('font-bold flex-1 mx-2 p-4 text-center text-lg ')}>
      {fixture.homeScore}
    </Text>
    <Text style={tailwind('font-bold flex-1 mx-2 p-4 text-center text-lg ')}>
      {fixture.awayScore}
    </Text>
  </View>
);

export default ScoreView;
