import React, {useReducer} from 'react';
import tailwind from 'tailwind-rn';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';

const reducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'changed':
      return {
        ...state,
        [payload.team]: payload.value,
      };
  }
};

const AddPredictionForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    home: 0,
    away: 0,
  });
  return (
    <View style={tailwind('w-full')}>
      <View>
        <Text>{JSON.stringify(state)}</Text>
      </View>
      <View style={tailwind('w-full mb-4')}>
        <Text style={tailwind('mb-2')}>Home</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) =>
            dispatch({
              type: 'changed',
              payload: {
                team: 'home',
                value: parseInt(text, 10),
              },
            })
          }
          style={tailwind('bg-purple-200 w-full p-4 rounded-md')}
        />
      </View>
      <View style={tailwind('w-full mb-8')}>
        <Text style={tailwind('mb-2')}>Away</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) =>
            dispatch({
              type: 'changed',
              payload: {
                team: 'away',
                value: parseInt(text, 10),
              },
            })
          }
          style={tailwind('bg-purple-200 w-full p-4 rounded-md')}
        />
      </View>
      <TouchableOpacity style={tailwind('bg-purple-800 w-full p-4 rounded-md')}>
        <Text style={tailwind('uppercase text-center text-purple-200')}>
          Suivant
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PredictionScreen = () => {
  return (
    <View style={tailwind('bg-white pt-12 h-full items-center p-6')}>
      <Text style={tailwind('text-indigo-800 text-3xl text-center my-6  w-56')}>
        PredictionScreen
      </Text>
      <AddPredictionForm />
    </View>
  );
};
export default PredictionScreen;
