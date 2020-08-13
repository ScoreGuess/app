import React from 'react';
import {TextInput, View} from 'react-native';
import tailwind from 'tailwind-rn';

type ScoreInputProps = {
  onChange: (value: number | null) => void;
  value: number;
};
const ScoreInput = ({onChange, value}: ScoreInputProps) => {
  const sanitizedValue = `${value ?? ''}`;
  const handleChangeText = (text: string) => {
    const parsedValue = parseInt(text, 10);
    // no value result in NaN which cause everything to break
    onChange(Number.isNaN(parsedValue) ? null : parsedValue);
  };
  return (
    <TextInput
      keyboardType="number-pad"
      onChangeText={handleChangeText}
      value={sanitizedValue}
      style={tailwind(
        'bg-gray-200 font-bold flex-1 mx-2 p-4 rounded-md  text-center text-lg ',
      )}
    />
  );
};

export default ScoreInput;
