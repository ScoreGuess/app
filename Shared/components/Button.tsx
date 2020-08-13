import React, {ReactNode} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tailwind from 'tailwind-rn';

type ButtonProps = {
  children: ReactNode;
  onPress: Function;
  variant?: 'primary' | 'secondary' | 'tertiary';
  style?: String;
  rest?: any;
};

const variants = {
  background: {
    primary: 'bg-purple-800',
    tertiary: '',
  },
  text: {
    primary: 'text-purple-200',
    tertiary: 'text-purple-800',
  },
};
const Button = ({
  children,
  variant = 'primary',
  onPress,
  ...rest
}: ButtonProps) => {
  return (
    <View {...rest}>
      <TouchableOpacity
        style={tailwind(
          `${variants.background[variant]} w-full p-4 rounded-md`,
        )}
        onPress={onPress}>
        <Text
          style={tailwind(`${variants.text[variant]} uppercase text-center`)}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
