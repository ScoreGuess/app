import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';
import ParticipantScore from './PredictionScore';
import {ParticipantWithScore} from '../types';

interface ParticipantRowProps {
  participant: ParticipantWithScore;
}
const ParticipantRow = ({participant}: ParticipantRowProps) => {
  return (
    <View style={tailwind(' py-2 flex-row items-center')}>
      <View style={tailwind('flex-1')}>
        <Text>{participant.user.displayName ?? participant.user.id}</Text>
      </View>
      <View style={tailwind('flex-row items-center')}>
        <Text style={tailwind('mr-2')}>
          {participant.homeScore} - {participant.awayScore}
        </Text>
        <ParticipantScore score={participant.score} />
      </View>
    </View>
  );
};
export default ParticipantRow;
