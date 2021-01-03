import {Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {StackHeaderLeftButtonProps} from '@react-navigation/stack';

const HeaderLeft = ({onPress}: StackHeaderLeftButtonProps) => (
  <View style={tailwind('flex-row p-4')}>
    <View style={tailwind('flex-initial mr-2')}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        color={getColor('red-600')}
        size={16}
      />
    </View>
    <Text style={tailwind('flex-1 font-bold')} onPress={onPress}>
      Retour
    </Text>
  </View>
);

export default HeaderLeft;
