import Card from '../../Shared/components/Card';
import tailwind from 'tailwind-rn';
import {Text} from 'react-native';
import React from 'react';

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

export default AloneDisclaimer;
