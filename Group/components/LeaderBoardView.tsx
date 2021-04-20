import React from 'react';
import {ScrollView, Share, View} from 'react-native';
import tailwind from 'tailwind-rn';
import AloneDisclaimer from './AloneDisclaimer';
import ParticipantsView from './ParticipantsView';
import Button from '../../Shared/components/Button';
import {computePoints} from '../../Results/utils';
import {encode as base64Encoded} from 'base-64';

const LeaderBoardView = ({group, onScroll}) => {
  const participants = group.rankings
    .map(({score, userId}) => {
      return {
        ...group.participants.find((p) => p.id === userId),
        points: score,
      };
    })
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
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} bounces={false}>
      <View style={tailwind('mt-16 p-2 pb-8')}>
        {participants.length <= 1 ? (
          <AloneDisclaimer group={group} />
        ) : (
          <ParticipantsView group={{...group, participants}} />
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
  );
};

export default LeaderBoardView;
