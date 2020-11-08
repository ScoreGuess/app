import tailwind from 'tailwind-rn';
import {Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Tab = ({children, style, onPress, active}) =>
  active === true ? (
    <View
      style={{...tailwind('border-b-2 flex-1 border-red-600 p-2'), ...style}}>
      <Pressable onPress={onPress}>
        <Text style={tailwind('font-bold text-center')}>{children}</Text>
      </Pressable>
    </View>
  ) : (
    <View
      style={{
        ...tailwind('border-b-2 flex-1 border-transparent p-2'),
        ...style,
      }}>
      <Pressable onPress={onPress}>
        <Text style={tailwind('font-bold text-gray-600 text-center')}>
          {children}
        </Text>
      </Pressable>
    </View>
  );

const tabs = ['Classement', 'Résultats'];
const GroupNavigation = ({onChange}) => {
  const [state, setState] = useState(0);
  const handleClick = (index) => {
    setState(index);
  };

  useEffect(() => {
    onChange(state);
  }, [state]);
  return (
    <View style={tailwind('mt-4 mb-2 mx-16 flex-row justify-center')}>
      {tabs.map((tab, i) => (
        <Tab onPress={() => handleClick(i)} key={i} active={i === state}>
          {tab}
        </Tab>
      ))}
    </View>
  );
};

export default GroupNavigation;
