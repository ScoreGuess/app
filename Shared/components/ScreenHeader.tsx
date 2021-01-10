import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';

interface ScreenHeaderProps {
  children: string;
}

const ScreenHeader = ({children}: ScreenHeaderProps) => (
  <View style={tailwind('mt-4 mb-2 px-4')}>
    <Text style={tailwind('text-xl font-bold text-red-600')}>{children}</Text>
  </View>
);

export default ScreenHeader;
