import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GroupsView from '../containers/GroupsView';
import GroupView from './GroupView';
import HeaderLeft from '../../Shared/components/HeaderLeft';
import AddGroupForm from '../containers/AddGroupForm';
import JoinGroupForm from '../containers/JoinGroupForm';
import tailwind, {getColor} from 'tailwind-rn';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

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
      options={({route}) => ({
        ...stackOptions,
        headerTitle: () => (
          <Text style={tailwind('font-bold')}>{route.params.group.name}</Text>
        ),
        headerLeft: HeaderLeft,
      })}
      component={GroupView}
    />
  </Stack.Navigator>
);

export default GroupsScreen;
