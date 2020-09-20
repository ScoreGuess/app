import {Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const HeaderLeft = ({onPress}) => (
  <View style={tailwind('flex-row p-1')}>
    <View style={tailwind('flex-initial mr-1')}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        color={getColor('red-600')}
        size={16}
      />
    </View>
    <Text style={tailwind('flex-1')} onPress={onPress}>
      Retour
    </Text>
  </View>
);

export default HeaderLeft;
