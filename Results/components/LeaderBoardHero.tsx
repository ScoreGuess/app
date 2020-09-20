import {Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Card from '../../Shared/components/Card';

const LeaderBoardHero = ({participant}) => (
  <Card
    style={tailwind(
      'p-4 mb-4 bg-white rounded-lg justify-between items-center',
    )}>
    <View style={tailwind('bg-red-200 p-6 rounded-full mb-4')}>
      <FontAwesomeIcon icon={faTrophy} color={getColor('red-600')} size={32} />
    </View>
    <Text style={tailwind('font-bold mb-4')}>{participant.email}</Text>
    <Text style={tailwind('font-bold text-red-800 text-xl')}>
      {participant.points} points
    </Text>
  </Card>
);

export default LeaderBoardHero;
