import React from 'react';
import {View, Text} from 'react-native';
import tailwind from 'tailwind-rn';
import TeamView from './TeamView';
import ResultListView from './ResultListView';
import Card from '../../Shared/components/Card';
import ScoreView from './ScoreView';
import PronosticsAccordion from '../../Group/components/PronosticsAccordeon';
import {Fixture} from '../../Fixture/types';

interface GroupFixtureViewProps {
  fixture: Fixture;
}

const GroupFixtureView = ({fixture}: GroupFixtureViewProps) => (
  <Card style={tailwind('bg-white m-2 p-2')}>
    <View style={tailwind('flex-row items-start py-4')}>
      <TeamView team={fixture.homeTeam} />
      <View style={tailwind('flex-1')}>
        <ScoreView fixture={fixture} />
      </View>
      <TeamView team={fixture.awayTeam} />
    </View>
    {fixture.status === 'FINISHED' && fixture.prediction && (
      <View style={tailwind(' border-t-2 border-gray-200  mb-2')}>
        <View style={tailwind('flex-row justify-between px-2 py-4 mt-4')}>
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
        <ResultListView
          prediction={fixture.prediction}
          style={tailwind('bg-gray-200 mt-2 px-2 rounded-md')}
        />
      </View>
    )}
    {fixture.status === 'FINISHED' && <PronosticsAccordion fixture={fixture} />}
  </Card>
);

export default GroupFixtureView;
