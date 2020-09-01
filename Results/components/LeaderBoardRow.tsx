import auth from '@react-native-firebase/auth';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';

const LeaderBoardRow = ({participant, index}) => {
  const {uid} = auth().currentUser;
  const bgColor = participant.id === uid ? 'bg-red-200' : 'bg-gray-200';
  return (
    <View
      style={tailwind(
        `flex-row p-4 ${bgColor} rounded-lg my-2 justify-between`,
      )}
      key={participant.id}>
      <View style={tailwind('flex-row justify-between items-center')}>
        <Text style={tailwind('font-bold mr-2')}>{index + 2}ème</Text>
        <Text>{participant.email}</Text>
      </View>
      <View>
        <Text style={tailwind('text-red-800 font-bold')}>
          {participant.points}
        </Text>
      </View>
    </View>
  );
};
export default LeaderBoardRow;
