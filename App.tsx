/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFutbol, faCog} from '@fortawesome/free-solid-svg-icons';

import {SafeAreaView, StatusBar} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import HomeScreen from './Home/components/HomeScreen';
import SignInScreen from './Auth/components/SignInScreen';
import ProfileScreen from './Profile/components/ProfileScreen';

declare const global: {HermesInternal: null | {}};

const httpLink = createHttpLink({
  //uri: 'http://localhost:5000/scoreguess-17a79/us-central1/graphql',
  uri: 'https://us-central1-scoreguess-17a79.cloudfunctions.net/graphql',
});

const Tab = createBottomTabNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [client, setClient] = useState(null);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    const authLink = setContext(async (_, {headers}) => {
      // get the authentication token from local storage if it exists
      const idToken = await auth().currentUser.getIdToken(true);
      console.log(idToken);
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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <SafeAreaView>
        <SignInScreen />
      </SafeAreaView>
    );
  }

  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={tailwind('h-full bg-white')}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let icon;

                if (route.name === 'Home') {
                  icon = faFutbol;
                } else {
                  icon = faCog;
                }

                // You can return any component that you like here!
                return <FontAwesomeIcon icon={icon} color={color} size={20} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
