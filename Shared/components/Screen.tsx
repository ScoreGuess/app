import React, {ReactNode} from 'react';
import {View} from 'react-native';
import tailwind from 'tailwind-rn';

type ScreenProps = {
  children: ReactNode;
};
const Screen = ({children}: ScreenProps) => (
  <View style={tailwind('w-full h-full bg-white px-4 pt-8')}>{children}</View>
);

export default Screen;
