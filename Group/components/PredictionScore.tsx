import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';

const colors: {[key: number]: string} = {
  0: 'red',
  1: 'yellow',
  3: 'green',
};

interface ParticipantScoreProps {
  score: number;
}

const ParticipantScore = ({score}: ParticipantScoreProps) => {
  return (
    <View
      style={tailwind(
        `w-8 h-8 bg-${colors[score]}-100 rounded-full flex-row items-center justify-center`,
      )}>
      <Text style={tailwind(`text-${colors[score]}-600 font-bold`)}>
        {score}
      </Text>
    </View>
  );
};

export default ParticipantScore;
