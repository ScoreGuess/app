import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import { Card } from 'react-native-paper'
import React from 'react';

const RankBubble = ({rank}) => {
  let bgColor = 'bg-gray-200';
  switch (rank) {
    case 1:
      bgColor = 'bg-red-600';
      break;
    case 2:
      bgColor = 'bg-red-400';
      break;
    case 3:
      bgColor = 'bg-red-200';
      break;
    default:
      break;
  }
  return (
    <View
      style={tailwind(
        `h-8 w-8 mr-2 ${bgColor} rounded-full flex-row justify-center items-center`,
      )}>
      <Text style={tailwind('text-center')}>{rank}</Text>
    </View>
  );
};

const ParticipantCard = ({rank, participant, current}) => (
  <Card>
      <Card.Content>

    <View style={tailwind('flex-1 flex-row items-center')}>
      <RankBubble rank={rank} />
      <Text style={tailwind(`${current ? 'font-bold' : ''}`)}>
        {participant.displayName ?? participant.email}
      </Text>
    </View>
    <View style={tailwind('flex-initial ')}>
      <Text style={tailwind('font-bold')}>{participant.points}</Text>
    </View>
      </Card.Content>

  </Card>
);

export default ParticipantCard;
