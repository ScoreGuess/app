import {View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import React from 'react';

const Card = ({children, style}) => {
  return (
    <View
      style={{
        ...style,
        ...tailwind('rounded-lg'),
        shadowColor: getColor('gray-900'),
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 12,
      }}>
      {children}
    </View>
  );
};

export default Card;
