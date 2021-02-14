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

const groupOptions = ({route}: any): StackNavigationOptions => ({
  ...stackOptions,
  headerStyle: tailwind('border-b-2 border-gray-200 bg-gray-100'),
  title: route.params.group.name,
  headerBackTitle: 'Retour',
  headerBackTitleStyle: tailwind('text-black text-sm font-bold'),
  headerBackImage: () => (
    <View style={tailwind('px-2')}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        color={getColor('red-600')}
        size={16}
      />
    </View>
  ),
  /* headerTitle: () => (
    <View style={tailwind('flex flex-row items-center bg-red-200')}>
      <View style={tailwind('flex-1 bg-blue-200 text-center')}>
        <Text style={tailwind('font-bold')}>{route.params.group.name}</Text>
      </View>
      <View style={tailwind('w-24 bg-green-200 py-2')}></View>
    </View>
  ),
  headerLeft: HeaderLeft,*/
});

const GroupsScreen = ({}) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{...stackOptions, headerShown: false}}
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
    <Stack.Screen name="Group" options={groupOptions} component={GroupView} />
  </Stack.Navigator>
);

export default GroupsScreen;
