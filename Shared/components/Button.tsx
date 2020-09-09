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
    primary: 'border-gray-300',
    tertiary: 'border-transparent',
  },
  text: {
    primary: 'text-red-600',
    tertiary: 'text-gray-600',
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
          `${variants.background[variant]} border-2 px-4 w-full p-4 rounded-full`,
        )}
        onPress={onPress}>
        <Text
          style={tailwind(
            `${variants.text[variant]} font-bold uppercase text-center`,
          )}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
