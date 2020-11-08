import React from 'react';
import tailwind from 'tailwind-rn';
import {Pressable, Text, View} from 'react-native';

const Dot = ({checked}) => (
  <View
    style={{
      ...tailwind('w-4 h-4  rounded-full'),
      ...(checked === true
        ? tailwind('bg-red-600 border-2 border-red-300')
        : tailwind('bg-gray-300')),
    }}
  />
);

const Radio = ({display, checked, onPress, style}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <View
        style={{
          ...tailwind(
            'p-4 border-2 rounded-md flex-row justify-between items-center',
          ),
          ...(checked === true
            ? tailwind('bg-red-100 border-red-600')
            : tailwind('border-gray-300')),
        }}>
        <Dot checked={checked} />
        <Text
          style={{
            ...(checked === true
              ? tailwind('text-red-600')
              : tailwind('text-black')),
          }}>
          {display}
        </Text>
      </View>
    </Pressable>
  );
};
Radio.defaultProps = {
  checked: false,
};
export default Radio;
