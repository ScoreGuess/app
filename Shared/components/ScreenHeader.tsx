import {Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

interface ScreenHeaderProps {
  children: string;
}

const ScreenHeader = ({children}: ScreenHeaderProps) => (
  <View
    style={tailwind(
      'mt-4 mb-2 px-4 flex-row justify-between w-full items-center',
    )}>
    <Text style={tailwind('text-xl font-bold text-red-600')}>{children}</Text>
  </View>
);

export default ScreenHeader;
