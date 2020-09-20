import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screen from '../../Shared/components/Screen';
import GroupsView from '../containers/GroupsView';
import GroupView from './GroupView';
import HeaderLeft from '../../Shared/components/HeaderLeft';
import AddGroupForm from '../containers/AddGroupForm';
import JoinGroupForm from '../containers/JoinGroupForm';

const Stack = createStackNavigator();

const stackOptions = {
  headerStyle: {backgroundColor: 'transparent', borderColor: 'transparent'},
  headerTitle: () => null,
};
const GroupsScreen = ({}) => (
  <Screen>
    <Stack.Navigator>
      <Stack.Screen
        options={stackOptions}
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
        options={{
          ...stackOptions,
          headerLeft: HeaderLeft,
        }}
        component={GroupView}
      />
    </Stack.Navigator>
  </Screen>
);

export default GroupsScreen;
