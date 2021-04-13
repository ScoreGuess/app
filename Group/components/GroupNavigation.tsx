import tailwind from 'tailwind-rn';
import {Pressable, Text, View} from 'react-native';
import { Chip, Colors } from 'react-native-paper'
import React, {useEffect, useState} from 'react';

const Tab = ({children, style, onPress, active}) => (
  <Pressable onPress={onPress}>
    {active === true ? (
      <View
        style={{
          ...tailwind(
            'flex-1 bg-red-600 rounded-full px-6 flex-row items-center justify-center',
          ),
          ...style,
        }}>
        <Text style={tailwind('font-bold text-gray-100 text-center')}>
          {children}
        </Text>
      </View>
    ) : (
      <View
        style={{
          ...tailwind('flex-1 px-2 flex-row items-center justify-center'),
          ...style,
        }}>
        <Text style={tailwind('font-bold text-gray-600 text-center')}>
          {children}
        </Text>
      </View>
    )}
  </Pressable>
);

const tabs = ['Classement', 'Résultats'];

export const GROUP_NAVIGATION_HEADER_HEIGHT = 55;

const GroupNavigation = ({onChange}) => {
  const [state, setState] = useState(0);
  const handleClick = (index) => {
    setState(index);
  };
  useEffect(() => {
    onChange(state);
  }, [state]);
  return (
    <View
      style={{
          display:'flex',
          margin: 8,
          flexDirection:"row",
      }}>
      {tabs.map((tab, i) => (
        <Chip mode="outlined" icon="" style={{ marginRight: 8, backgroundColor: i === state ? Colors.grey800: Colors.white}} selectedColor={i === state ? Colors.white: Colors.black} onPress={() => handleClick(i)} key={i} >
          {tab}
        </Chip>
      ))}
    </View>
  );
};

export default GroupNavigation;
