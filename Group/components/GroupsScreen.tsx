import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import GroupsView from '../containers/GroupsView';
import GroupView from './GroupView';
import HeaderLeft from '../../Shared/components/HeaderLeft';

const Stack = createStackNavigator();

const AddGroup = ({}) => (
  <View>
    <Text>test</Text>
  </View>
);

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
      <Stack.Screen name={'Add'} options={stackOptions} component={AddGroup} />
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
