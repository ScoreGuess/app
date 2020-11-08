import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
const BetterScoreInput = ({onChange, value}) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    onChange(state);
  }, [state]);
  return (
    <View
      style={tailwind(
        'flex-row items-center bg-gray-200 rounded-full border-2 border-gray-200',
      )}>
      <Pressable
        onPress={() =>
          setState((s) => (Number.isInteger(s) && s > 0 ? --s : 0))
        }>
        <View
          style={tailwind(
            'w-10 flex-row justify-center items-center h-10 bg-white rounded-full',
          )}>
          <FontAwesomeIcon
            icon={faMinus}
            color={getColor('red-600')}
            size={12}
          />
        </View>
      </Pressable>
      <View
        style={tailwind(
          'w-10 h-10 bg-gray-200 rounded-full mx-1 flex-row items-center',
        )}>
        <Text style={tailwind('flex-1 font-bold text-center')}>{state}</Text>
      </View>
      <Pressable
        onPress={() => setState((s) => (Number.isInteger(s) ? ++s : 1))}>
        <View
          style={tailwind(
            ' h-10 w-10 flex-row justify-center items-center bg-white  rounded-full',
          )}>
          <FontAwesomeIcon
            icon={faPlus}
            color={getColor('red-600')}
            size={12}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default BetterScoreInput;
