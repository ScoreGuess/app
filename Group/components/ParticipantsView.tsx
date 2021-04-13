import auth from '@react-native-firebase/auth';
import tailwind from 'tailwind-rn';
import {Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import { DataTable } from "react-native-paper";
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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            Participant
          </DataTable.Title>
          <DataTable.Title numeric>
            Score
          </DataTable.Title>

        </DataTable.Header>
        {participants.map((participant, i) => (
            <DataTable.Row key={participant.id}>
              <DataTable.Cell>
                <Text style={{fontWeight: i+1 === rank ? "bold": "normal"}}>
                 {i+1} {participant.displayName ?? participant.email}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{fontWeight: i+1 === rank ? "bold": "normal"}}>
                  {participant.points}
                </Text>
                </DataTable.Cell>
            </DataTable.Row>
            ))}
      </DataTable>
    </View>
  );
};

export default ParticipantsView;
