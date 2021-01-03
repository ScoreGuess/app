import auth from '@react-native-firebase/auth';
import tailwind from 'tailwind-rn';
import {Text, View} from 'react-native';
import React from 'react';
import ParticipantCard from './ParticipantCard';
import moment from 'moment';
const ParticipantsView = ({group}) => {
  const {participants, createdAt} = group;
  const user = auth().currentUser;
  const rank =
    1 + participants.findIndex((participant) => participant.id === user.uid);
  return (
    <View>
      <View style={tailwind('p-2 mb-2')}>
        <Text style={tailwind('mb-2')}>
          Les scores sont comptabilisés depuis le {moment(createdAt).calendar()}
        </Text>
        <Text style={tailwind('font-bold')}>
          Tu es {rank === 1 ? `1er` : `${rank}ème`} sur {participants.length}{' '}
          participants
        </Text>
      </View>
      {participants.map((participant, i) => (
        <ParticipantCard
          key={i}
          rank={i + 1}
          participant={participant}
          current={participant.id === user.uid}
        />
      ))}
    </View>
  );
};

export default ParticipantsView;