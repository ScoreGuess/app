import {Fixture} from '../types';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import TeamView from '../../Home/components/TeamView';
import ScoreView from '../../Home/components/ScoreView';
import PronosticView from './PronosticView';
import ResultListView from '../../Home/components/ResultListView';
import AttributeView from '../../Home/components/AttributeView';
import React from 'react';

interface FinishedViewProps {
  fixture: Fixture;
}
const FinishedView = ({fixture}: FinishedViewProps) => (
  <View>
    <View style={tailwind('flex-row items-start py-4')}>
      <TeamView team={fixture.homeTeam} />
      <View style={tailwind('flex-1')}>
        <ScoreView fixture={fixture} />
      </View>
      <TeamView team={fixture.awayTeam} />
    </View>
    {fixture.prediction != null ? (
      <View style={tailwind(' border-t-2 border-gray-200 px-4 mb-2')}>
        <PronosticView prediction={fixture.prediction} />
        <ResultListView prediction={fixture.prediction} />
      </View>
    ) : (
      <View style={tailwind(' border-t-2 border-gray-200 px-4 mb-2')}>
        <View style={tailwind('flex-row justify-between py-4 mt-4')}>
          <Text style={tailwind('font-bold flex-1')}>Pronostic</Text>
          <Text>pronostic non saisi</Text>
        </View>
        <View style={tailwind('pt-2 pb-2')}>
          <View style={tailwind('flex-row justify-between pt-2 pb-2')}>
            <Text style={tailwind('font-bold pr-1')}>Résultats</Text>
            <AttributeView attribute={{type: 'WRONG_RESULT'}} />
          </View>
        </View>
      </View>
    )}
  </View>
);

export default FinishedView;
