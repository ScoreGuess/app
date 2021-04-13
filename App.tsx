/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFutbol,
  faTable,
  faUserCircle,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import messaging from '@react-native-firebase/messaging';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Colors, DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import auth from '@react-native-firebase/auth';

import SignInScreen from './Auth/components/SignInScreen';
import ProfileScreen from './Profile/components/ProfileScreen';
import GroupsScreen from './Group/components/GroupsScreen';
import PronosticScreen from './Prediction/components/PronosticScreen';
import ResultsScreen from './Results/containers/ResultsScreen';
import {requestPermissions} from './Profile/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare const global: {HermesInternal: null | {}};

const httpLink = createHttpLink({
  //uri: 'http://localhost:5001/scoreguess-17a79/us-central1/graphql',
  uri: 'https://us-central1-scoreguess-17a79.cloudfunctions.net/graphql',
});

const Tab = createMaterialBottomTabNavigator();
const linking = {
  prefixes: ['scoreguess://'],
  config: {
    screens: {
      Groupes: {
        screens: {
          Join: 'join/:groupId',
        },
      },
    },
  },
};
export const theme={
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.red500,
    accent: '#f1c40f',
  },
}
const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const run = async () => {
      const status = await requestPermissions();
      if (status === messaging.AuthorizationStatus.DENIED) {
        AsyncStorage.setItem('reminders', String(false));
      }
    };
    run();
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    const authLink = setContext(async (_, {headers}) => {
      // get the authentication token from local storage if it exists
      const idToken = await auth().currentUser.getIdToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: idToken ? `Bearer ${idToken}` : '',
        },
      };
    });
    // In this project we use Apollo to connect to the database
    setClient(
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    );
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) {
    return null;
  }
  if (!user) {
    return (
      <SafeAreaView>
        <SignInScreen />
      </SafeAreaView>
    );
  }
  // 2 SafeAreaView for having two colors:
  //https://medium.com/reactbrasil/react-native-set-different-colors-on-top-and-bottom-in-safeareaview-component-f008823483f3
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>


      <SafeAreaView style={{flex: 0, ...tailwind('bg-gray-100')}} />
      <NavigationContainer linking={linking} fallback={<Text>chargement</Text>}>
        <Tab.Navigator
          barStyle={{backgroundColor: '#ffffff'}}
          activeColor={Colors.red500}
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
              let icon;
              if (route.name === 'Pronos') {
                icon = faFutbol;
              } else if (route.name === 'Résultats') {
                icon = faTable;
              } else if (route.name === 'Groupes') {
                icon = faUserFriends;
              } else {
                icon = faUserCircle;
              }

              // You can return any component that you like here!
              return <FontAwesomeIcon icon={icon} color={color} size={20} />;
            },
          })}>
          <Tab.Screen name="Pronos" component={PronosticScreen} />
          <Tab.Screen name="Groupes" component={GroupsScreen} />
          <Tab.Screen name="Résultats" component={ResultsScreen} />
          <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={getColor('gray-100')}
      />
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
