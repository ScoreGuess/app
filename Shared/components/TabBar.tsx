import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';

function TabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={tailwind('bg-white border-t-2 border-gray-200 p-2 flex-row')}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const Icon = options.tabBarIcon;
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tailwind('flex-1')}>
            <View style={tailwind('flex-col items-center pt-1')}>
              <View style={tailwind('mb-1')}>
                <Icon
                  color={isFocused ? getColor('red-600') : getColor('gray-500')}
                />
              </View>
              <Text style={tailwind('text-xs')}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
