import React from 'react';
import tailwind from 'tailwind-rn';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import Screen from '../../Shared/components/Screen';
import FixtureList from '../../Home/containers/FixtureList';
import FixtureView from '../../Home/components/FixtureView';
import {gql, useQuery} from '@apollo/client';

const CURRENT_MATCH_DAY = gql`
  query getCurrentMatchDay {
    currentMatchDay
  }
`;

const PronosticScreen = () => {
  const {loading, data} = useQuery(CURRENT_MATCH_DAY);
  const currentMatchDay = data?.currentMatchDay;

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={tailwind(' h-full justify-center w-full')}>
          <View style={tailwind('mt-4 mb-2 px-4')}>
            <Text style={tailwind('text-xl font-bold text-red-600')}>
              Pronostics
            </Text>
          </View>
          <View style={tailwind('flex-1')}>
            <FixtureList matchDay={currentMatchDay}>
              {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
            </FixtureList>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default PronosticScreen;
