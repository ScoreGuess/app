import {computePoints} from '../../Results/utils';
import {ScrollView, Share, Text, View} from 'react-native';
import {encode as base64Encoded} from 'base-64';
import tailwind from 'tailwind-rn';
import Card from '../../Shared/components/Card';
import React from 'react';
import Button from '../../Shared/components/Button';
import auth from '@react-native-firebase/auth';

const ParticipantsCard = ({participants}) => {
  const user = auth().currentUser;
  const rank =
    1 + participants.findIndex((participant) => participant.id === user.uid);
  return (
    <Card style={tailwind('bg-white py-2')}>
      <View style={tailwind('p-4 mb-2')}>
        <Text style={tailwind('font-bold')}>
          Tu es {rank === 1 ? `1er` : `${rank}ème`} sur {participants.length}{' '}
          participants
        </Text>
      </View>
      {participants.map((participant, i) => (
        <View
          key={i}
          style={tailwind('p-4 flex-row border-t-2 border-gray-300')}>
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
  );
};
const AloneDisclaimer = ({group}) => {
  return (
    <Card style={tailwind('py-8 px-4')}>
      <Text style={tailwind('text-lg font-bold')}>
        😅 Tu te sens un peu seul ?
      </Text>
      <Text style={tailwind('mt-2 text-gray-600 leading-6')}>
        Invite tes potes en leur envoyant le lien suivant. ils rejoindront
        directement <Text style={tailwind('text-red-600')}>{group.name}</Text>
      </Text>
    </Card>
  );
};
const GroupView = ({route}) => {
  const {group} = route.params;
  const participants = group.participants
    .map((participant) => ({
      ...participant,
      points: computePoints(participant),
    }))
    .sort((a, b) => b.points - a.points);

  // prevent the app from complaining
  const token = base64Encoded(
    JSON.stringify({
      name: encodeURIComponent(group.name),
      id: group.id,
    }),
  );
  const link = `https://scoreguess-17a79.web.app/join/${token}`;
  return (
    <View style={tailwind('bg-gray-100 h-full')}>
      <ScrollView>
        <View style={tailwind('p-2 pb-8')}>
          {participants.length <= 1 ? (
            <AloneDisclaimer group={group} />
          ) : (
            <ParticipantsCard participants={participants} />
          )}
          <View style={tailwind('mt-4')}>
            <Button
              onPress={() => {
                Share.share({
                  message: `Rejoins-moi sur le groupe "${group.name}" sur ScoreGuess. 
              Utilise juste le lien suivant: 
              ${link}`,
                });
              }}>
              Invite tes potes
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupView;
