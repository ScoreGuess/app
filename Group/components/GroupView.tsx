import {computePoints} from '../../Results/utils';
import {ScrollView, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import Card from '../../Shared/components/Card';
import React from 'react';

const GroupView = ({route}) => {
  const {group} = route.params;
  const participants = group.participants
    .map((participant) => ({
      ...participant,
      points: computePoints(participant),
    }))
    .sort((a, b) => b.points - a.points);
  return (
    <ScrollView style={tailwind('bg-gray-100 p-2')}>
      <Card style={tailwind('bg-white py-2')}>
        {participants.map((participant, i) => (
          <View
            key={i}
            style={tailwind('p-4 flex-row border-b-2 border-gray-300')}>
            <View style={tailwind('flex-1')}>
              <Text>{participant.displayName || participant.id}</Text>
              <Text>{participant.email}</Text>
            </View>
            <View style={tailwind('flex-initial')}>
              <Text>{participant.points}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

export default GroupView;
