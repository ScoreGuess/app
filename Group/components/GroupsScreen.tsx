import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screen from '../../Shared/components/Screen';
import GroupsView from '../containers/GroupsView';
import GroupView from './GroupView';
import HeaderLeft from '../../Shared/components/HeaderLeft';
import AddGroupForm from '../containers/AddGroupForm';
import JoinGroupForm from '../containers/JoinGroupForm';
import tailwind, {getColor} from 'tailwind-rn';
import {View} from 'react-native';

const Stack = createStackNavigator();

const stackOptions = {
  headerStyle: {
    backgroundColor: getColor('gray-100'),
    elevation: 0,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  headerTitle: () => null,
};
const GroupsScreen = ({}) => (
  <Stack.Navigator>
    <Stack.Screen options={stackOptions} name={'Home'} component={GroupsView} />
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
      options={{
        ...stackOptions,
        headerLeft: HeaderLeft,
      }}
      component={GroupView}
    />
  </Stack.Navigator>
);

export default GroupsScreen;
