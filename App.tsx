/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import tailwind from 'tailwind-rn';
import PredictionScreen from './Prediction/components/PredictionScreen';
import HomeScreen from './Home/components/HomeScreen';

const Stack = createStackNavigator();

declare const global: {HermesInternal: null | {}};

const uri = 'https://us-central1-scoreguess-17a79.cloudfunctions.net/graphql';
//const uri = 'http://localhost:5001/scoreguess-17a79/us-central1/graphql';
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={tailwind('h-full bg-white')}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Prediction" component={PredictionScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
