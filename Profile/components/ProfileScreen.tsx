import auth from '@react-native-firebase/auth';
import Screen from '../../Shared/components/Screen';
import Button from '../../Shared/components/Button';
import {Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {gql, useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

const GET_USER_INFO = gql`
  query {
    user(userId: "24S8zgYYT6UWD8IgTMA3HXYkqDo1") {
      id
      firstName
      lastName
    }
  }
`;
const ProfileScreen = (props) => {
  const {loading, error, data} = useQuery(GET_USER_INFO);
  const user = data?.user ?? null;
  console.log(error);
  return (
    <Screen>
      <View style={tailwind('h-full justify-between')}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={tailwind('my-4')}>
            <Text style={tailwind('font-bold text-3xl')}>
              <Text>Salut&nbsp;</Text>
              <Text style={tailwind('text-purple-800')}>{user?.firstName}</Text>
            </Text>
            <Text style={tailwind('mt-2 text-3xl')}>
              Prêt à rouler sur tes potes ?
            </Text>
          </View>
        )}
        <Button
          onPress={() => {
            auth().signOut();
          }}>
          Se déconnecter
        </Button>
      </View>
    </Screen>
  );
};

export default ProfileScreen;
