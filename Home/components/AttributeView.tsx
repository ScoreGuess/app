import React from 'react';
import {View, Text} from 'react-native';
import tailwind from 'tailwind-rn';

const labels = {
  EXACT_SCORE: 'Score exact',
  EXACT_RESULT: 'Résultat exact',
  WRONG_RESULT: 'Mauvais résultat',
};

const points = {
  EXACT_SCORE: '+3 points',
  EXACT_RESULT: '+1 point',
  WRONG_RESULT: '+0 point',
};
const AttributeView = ({attribute}) => (
  <View style={tailwind('flex-row items-end')}>
    <View style={tailwind('items-end')}>
      <Text style={tailwind('pb-1')}>{labels[attribute.type]}</Text>
      <Text style={tailwind('font-bold text-red-600')}>
        {points[attribute.type]}
      </Text>
    </View>
  </View>
);

/*
*     <View
        style={tailwind(
          'border-2 justify-center items-center border-gray-400 rounded-full py-2 px-4',
        )}>
      </View>

* */
export default AttributeView;
