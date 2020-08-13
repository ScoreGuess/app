import {Image, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';

const TeamView = ({team}) => (
  <View style={tailwind('flex-1 items-center')}>
    <Image style={{width: 32, height: 32}} source={{uri: team.logo}} />
    <Text style={tailwind('pt-4')}>{team.shortName}</Text>
  </View>
);

export default TeamView;
