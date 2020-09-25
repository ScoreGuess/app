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

const colors = {
  EXACT_SCORE: 'text-green-600',
  EXACT_RESULT: 'text-yellow-600',
  WRONG_RESULT: 'text-red-600',
};
const AttributeView = ({attribute}) => (
  <View style={tailwind('flex-col flex-1 items-stretch')}>
    <Text style={tailwind('pb-1 text-right')}>{labels[attribute.type]}</Text>
    <Text style={tailwind(`font-bold text-right ${colors[attribute.type]}`)}>
      {points[attribute.type]}
    </Text>
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
