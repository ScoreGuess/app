import React, {ReactNode} from 'react';
import {View} from 'react-native';
import tailwind from 'tailwind-rn';

type ScreenProps = {
  children: ReactNode;
  style: any;
};
const Screen = ({children, style}: ScreenProps) => (
  <View style={{...style, ...tailwind('w-full h-full bg-gray-100')}}>
    {children}
  </View>
);

export default Screen;
