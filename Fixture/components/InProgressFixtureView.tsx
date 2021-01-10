import {Fixture} from '../types';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import TeamView from '../../Home/components/TeamView';
import React from 'react';
import PronosticView from './PronosticView';

interface InProgressViewProps {
  fixture: Fixture;
}
const InProgressFixtureView = ({fixture}: InProgressViewProps) => (
  <View>
    <View style={tailwind('flex-row items-start items-end py-4')}>
      <TeamView team={fixture.homeTeam} />
      <View style={tailwind('flex-1')}>
        <Text
          style={tailwind('text-center self-center font-bold text-red-800')}>
          En cours
        </Text>
      </View>
      <TeamView team={fixture.awayTeam} />
    </View>

    <View style={tailwind(' border-t-2 border-gray-200 px-4 mb-2')}>
      {fixture.prediction != null ? (
        <PronosticView prediction={fixture.prediction} />
      ) : (
        <View>
          <Text>test</Text>
        </View>
      )}
    </View>
  </View>
);

export default InProgressFixtureView;
