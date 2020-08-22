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
            <View style={tailwind('flex-1')}>
              <ScoreView fixture={fixture} />
            </View>
          )}
        </View>
        <TeamView team={fixture.awayTeam} />
      </View>
      {fixture.status === 'FINISHED' && (
        <View style={tailwind('bg-gray-200 px-4')}>
          <View
            style={tailwind(
              'flex-row justify-between py-4' /* border-b-2 border-gray-400*/,
            )}>
            <Text style={tailwind(' font-bold')}>Pronostic</Text>
            <View style={tailwind('flex-row ')}>
              <Text style={tailwind('font-bold')}>
                {fixture.prediction.homeScore}
              </Text>
              <Text style={tailwind('font-bold')}>&nbsp;&ndash;&nbsp;</Text>
              <Text style={tailwind('font-bold')}>
                {fixture.prediction.awayScore}
              </Text>
            </View>
          </View>
          {/* <View>
            <View style={tailwind('flex-row justify-between pt-4 pb-2')}>
              <Text>Résultats</Text>
              <View style={tailwind('flex-row')}>
                <Text style={tailwind('')}>Mauvais résultat (0pt)</Text>
              </View>
            </View>
            <View style={tailwind('flex-row justify-end pt-2 pb-2')}>
              <View style={tailwind('flex-row')}>
                <Text style={tailwind('')}>Bon résultat (1pt)</Text>
              </View>
            </View>
          </View>
          <View style={tailwind('flex-row justify-between  pt-2 pb-4')}>
            <Text style={tailwind(' font-bold')}>Total</Text>
            <View style={tailwind('flex-row')}>
              <Text style={tailwind('text-red-800 font-bold')}>0</Text>
            </View>
          </View>*/}
        </View>
      )}
    </View>
  );
};

export default FixtureView;
