import {Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const LeaderBoardHero = ({participant}) => (
  <View style={tailwind('p-4 mb-4 rounded-lg justify-between items-center')}>
    <View style={tailwind('bg-orange-400 p-8 rounded-full mb-4')}>
      <FontAwesomeIcon
        icon={faTrophy}
        color={getColor('orange-600')}
        size={64}
      />
    </View>
    <Text style={tailwind('font-bold mb-4')}>{participant.email}</Text>
    <Text style={tailwind('font-bold text-orange-800 text-xl')}>
      {participant.points} points
    </Text>
  </View>
);

export default LeaderBoardHero;
