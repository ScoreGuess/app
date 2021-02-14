import tailwind from 'tailwind-rn';
import {Pressable, Text, View} from 'react-native';
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
        ...tailwind(
          'p-2 flex-row justify-start bg-gray-100 border-b-2 border-gray-300',
        ),
        height: GROUP_NAVIGATION_HEADER_HEIGHT,
      }}>
      {tabs.map((tab, i) => (
        <Tab onPress={() => handleClick(i)} key={i} active={i === state}>
          {tab}
        </Tab>
      ))}
    </View>
  );
};

export default GroupNavigation;
