import auth from '@react-native-firebase/auth';
import Screen from '../../Shared/components/Screen';
import Button from '../../Shared/components/Button';
import {Text, View, TextInput} from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import UpdateProfileForm from '../containers/UpdateProfileForm';

const ProfileScreen = ({}) => {
  const user = auth().currentUser;

  return (
    <Screen>
      <View style={tailwind('h-full p-2 justify-between')}>
        <View style={tailwind('')}>
          <View style={tailwind('my-8 px-4')}>
            <Text style={tailwind('font-bold text-3xl')}>
              <Text>Salut&nbsp;</Text>
              <Text style={tailwind('text-red-600')}>{user?.displayName}</Text>
            </Text>
            <Text style={tailwind('mt-2 text-3xl')}>
              Prêt à rouler sur tes potes ?
            </Text>
          </View>
          <View>
            <UpdateProfileForm />
          </View>
        </View>
        <Button
          variant="tertiary"
          onPress={() => {
            auth().signOut();
          }}>
          Se déconnecter
        </Button>
      </View>
    </Screen>
  );
};

/*
{loading ? (
          <ActivityIndicator />
        ) : (
          <View style={tailwind('my-4')}>
            <Text style={tailwind('font-bold text-3xl')}>
              <Text>Salut&nbsp;</Text>
              <Text style={tailwind('text-red-600')}>{user?.firstName}</Text>
            </Text>
            <Text style={tailwind('mt-2 text-3xl')}>
              Prêt à rouler sur tes potes ?
            </Text>
          </View>
        )}
*
*/

export default ProfileScreen;
