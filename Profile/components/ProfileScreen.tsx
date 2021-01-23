import Screen from '../../Shared/components/Screen';
import {ScrollView, View} from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import UpdateProfileForm from '../containers/UpdateProfileForm';

const ProfileScreen = ({}) => {
  return (
    <Screen>
      <ScrollView>
        <View style={tailwind('h-full p-2 flex-col justify-between')}>
          <UpdateProfileForm style={tailwind('mb-2')} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;
