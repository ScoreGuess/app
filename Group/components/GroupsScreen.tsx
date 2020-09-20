import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import Screen from '../../Shared/components/Screen';
import GroupsView from '../containers/GroupsView';

const Stack = createStackNavigator();
const GroupView = ({group}) => {
  return (
    <View>
      <Text>Lance toi !</Text>
      <Text>Créés un groupe</Text>
      <Text>{JSON.stringify({group})}</Text>
    </View>
  );
};

const AddGroup = ({}) => (
  <View>
    <Text>test</Text>
  </View>
);
const GroupsScreen = ({}) => (
  <Screen>
    <Stack.Navigator>
      <Stack.Screen name={'Home'} component={GroupsView} />
      <Stack.Screen name={'Add'} component={AddGroup} />
      <Stack.Screen name="Group" component={GroupView} />
    </Stack.Navigator>
  </Screen>
);

export default GroupsScreen;
