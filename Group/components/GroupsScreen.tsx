import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import GroupsView from '../containers/GroupsView';
import GroupView from './GroupView';
import HeaderLeft from '../../Shared/components/HeaderLeft';
import AddGroupForm from '../containers/AddGroupForm';
import JoinGroupForm from '../containers/JoinGroupForm';
import tailwind, {getColor} from 'tailwind-rn';
import {Text, View} from 'react-native';
import {Group} from '../types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

export type RootStackParamList = {
  Home: undefined;
  Add: {userId: string};
  Join: {sort: 'latest' | 'top'} | undefined;
  Group: {
    group: Group;
  };
};
const Stack = createStackNavigator<RootStackParamList>();

const stackOptions = {
  headerStyle: {
    backgroundColor: getColor('gray-100'),
    elevation: 0,
    borderColor: 'transparent',
    borderWidth: 0,
  },
};
const GroupsScreen = ({}) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...stackOptions,
        headerShown: true,
        headerTitle: 'ScoreGuess',
        headerStyle: {backgroundColor: '#ffffff'},
      }}
      name={'Home'}
      component={GroupsView}
    />
    <Stack.Screen
      name={'Add'}
      options={{...stackOptions, headerLeft: HeaderLeft}}
      component={AddGroupForm}
    />
    <Stack.Screen
      name={'Join'}
      options={{...stackOptions, headerLeft: HeaderLeft}}
      component={JoinGroupForm}
    />
    <Stack.Screen
      name="Group"
      options={({route}) => {
        return {
          title: route?.params?.group?.name,
          headerBackTitle: '',
        };
      }}
      component={GroupView}
    />
  </Stack.Navigator>
);

export default GroupsScreen;
