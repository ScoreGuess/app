import {Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Header = ({icon, color, title, desc}) => (
  <View
    style={tailwind(
      'flex-row items-start px-4 mt-4 pb-4 border-b-2 border-gray-300',
    )}>
    <View style={tailwind(`rounded-lg p-3 mr-4 bg-${color}`)}>
      <FontAwesomeIcon icon={icon} color={getColor('white')} size={20} />
    </View>
    <View style={tailwind('flex-1')}>
      <Text style={tailwind('text-lg font-bold mb-1')}>{title}</Text>
      <Text style={tailwind('text-gray-600')}>{desc}</Text>
    </View>
  </View>
);

const Card = ({children, style}) => {
  return (
    <View
      style={{
        ...tailwind('rounded-lg bg-white'),
        shadowColor: getColor('gray-900'),
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        ...style,
      }}>
      {children}
    </View>
  );
};

Card.Header = Header;

export default Card;
