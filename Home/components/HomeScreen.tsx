import React from 'react';
import tailwind from 'tailwind-rn';
import {Text, View, KeyboardAvoidingView, Platform} from 'react-native';
import Screen from '../../Shared/components/Screen';
import FixtureList from '../containers/FixtureList';
import FixtureView from './FixtureView';

const HomeScreen = () => {
  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={tailwind('h-full justify-center w-full')}>
          <View style={tailwind('flex-row items-center p-4')}>
            <Text style={tailwind('text-4xl font-bold')}>👇</Text>
            <View style={tailwind('ml-4')}>
              <Text style={tailwind('text-2xl font-bold')}>Tes Pronostics</Text>
              <Text style={tailwind('text-2xl font-bold')}>
                <Text> de la&nbsp;</Text>
                <Text style={tailwind('text-red-600')}>1ère Journée</Text>
              </Text>
            </View>
          </View>
          <View style={tailwind('flex-1')}>
            <FixtureList>
              {(fixture) => <FixtureView key={fixture.id} fixture={fixture} />}
            </FixtureList>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default HomeScreen;
