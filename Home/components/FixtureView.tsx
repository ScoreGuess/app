import {View, Text} from 'react-native';
import tailwind from 'tailwind-rn';
import AddPredictionForm from '../../Prediction/components/AddPredictionForm';
import React from 'react';
import TeamView from './TeamView';

const ScoreView = ({fixture}) => {
  return (
    <View style={tailwind('flex-row')}>
      <Text style={tailwind('font-bold flex-1 mx-2 p-4 text-center text-lg ')}>
        {fixture.homeScore}
      </Text>
      <Text style={tailwind('font-bold flex-1 mx-2 p-4 text-center text-lg ')}>
        {fixture.awayScore}
      </Text>
    </View>
  );
};
const FixtureView = ({fixture}) => {
  return (
    <View>
      <View style={tailwind('flex-row items-start py-4')}>
        <TeamView team={fixture.homeTeam} />
        <View style={tailwind('flex-1')}>
          {fixture.status === 'PLANNED' ? (
            <AddPredictionForm fixture={fixture} />
          ) : (
            <ScoreView fixture={fixture} />
          )}
        </View>
        <TeamView team={fixture.awayTeam} />
      </View>
    </View>
  );
};

export default FixtureView;
