import {View} from 'react-native';
import tailwind from 'tailwind-rn';
import AddPredictionForm from '../../Prediction/components/AddPredictionForm';
import React from 'react';
import TeamView from './TeamView';

const FixtureView = ({fixture}) => {
  return (
    <View style={tailwind('flex-row items-start py-4')}>
      <TeamView team={fixture.homeTeam} />
      <View style={tailwind('flex-1')}>
        <AddPredictionForm fixture={fixture} />
      </View>
      <TeamView team={fixture.awayTeam} />
    </View>
  );
};

export default FixtureView;
