import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import AddPredictionForm from '../../Prediction/components/AddPredictionForm';
import React from 'react';
import TeamView from './TeamView';
import ResultListView from './ResultListView';
import Card from '../../Shared/components/Card';
import ScoreView from './ScoreView';

const FixtureView = ({fixture}) => {
  return (
    <Card style={tailwind('bg-white m-2 pt-4')}>
      {fixture.status === 'PLANNED' && <AddPredictionForm fixture={fixture} />}
      {fixture.status === 'IN_PROGRESS' && (
        <View style={tailwind('flex-row items-start py-4')}>
          <TeamView team={fixture.homeTeam} />
          <View style={tailwind('flex-1')}>
            <Text style={tailwind('text-center self-center')}>En cours</Text>
          </View>
          <TeamView team={fixture.awayTeam} />
        </View>
      )}
      {fixture.status === 'FINISHED' && (
        <View style={tailwind('flex-row items-start py-4')}>
          <TeamView team={fixture.homeTeam} />
          <View style={tailwind('flex-1')}>
            <ScoreView fixture={fixture} />
          </View>
          <TeamView team={fixture.awayTeam} />
        </View>
      )}
      {fixture.status === 'FINISHED' && fixture.prediction != null && (
        <View style={tailwind(' border-t-2 border-gray-200 px-4 mb-2')}>
          <View style={tailwind('flex-row justify-between py-4 mt-4')}>
            <Text style={tailwind('font-bold flex-1')}>Pronostic</Text>
            <View style={tailwind('flex-row')}>
              <Text style={tailwind('font-bold')}>
                {fixture.prediction.homeScore}
              </Text>
              <Text style={tailwind('font-bold')}>&nbsp;&ndash;&nbsp;</Text>
              <Text style={tailwind('font-bold')}>
                {fixture.prediction.awayScore}
              </Text>
            </View>
          </View>
          <ResultListView prediction={fixture.prediction} />
        </View>
      )}
    </Card>
  );
};

export default FixtureView;
