import React, {useReducer} from 'react';
import Screen from '../../Shared/components/Screen';

import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

import tailwind from 'tailwind-rn';
import Button from '../../Shared/components/Button';
import Card from '../../Shared/components/Card';

type SignInState = {
  method: 'signIn' | 'logIn';
  loading: boolean;
  error?: string;
  email: string;
  password: string;
};

type SignInAction = {
  type: 'toggled' | 'changed' | 'failed' | 'submitted';
  payload: any;
};

const reducer = (state: SignInState, action: SignInAction) => {
  const {type, payload} = action;
  switch (type) {
    case 'toggled':
      return {
        ...state,
        error: null,
        loading: false,
        method: state.method === 'logIn' ? 'signIn' : 'logIn',
      };

    case 'submitted':
      return {...state, loading: true};
    case 'changed':
      return {...state, [payload.type]: payload.value, error: null};
    case 'failed':
      return {...state, loading: false, error: payload};
    default:
      return state;
  }
};

const SignInScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    method: 'signIn', // logIn
    loading: false,
    error: null,
    email: '',
    password: '',
  });
  const handleSubmit = async () => {
    try {
      // gauthiergate
      if (state.email == '' || state.password == '') return;
      if (state.method === 'signIn') {
        await auth().createUserWithEmailAndPassword(
          state.email,
          state.password,
        );
      } else {
        await auth().signInWithEmailAndPassword(state.email, state.password);
      }
    } catch (error) {
      dispatch({
        type: 'failed',
        payload: error.code,
      });
    }
  };
  const toggleMethod = () => {
    dispatch({
      type: 'toggled',
    });
  };
  return (
    <Screen>
      <Card style={tailwind('m-2 mt-8 p-4 bg-white')}>
        <View style={tailwind('w-full mt-4')}>
          <Text style={tailwind('mb-2')}>Adresse email</Text>
          <TextInput
            keyboardType="email-address"
            onChangeText={(text) =>
              dispatch({
                type: 'changed',
                payload: {
                  type: 'email',
                  value: text.toLowerCase(),
                },
              })
            }
            value={state.email}
            style={tailwind('bg-gray-200 w-full p-4 rounded-md')}
          />
        </View>
        <View style={tailwind('w-full mt-4')}>
          <Text style={tailwind('mb-2')}>Mot de passe</Text>
          <TextInput
            keyboardType="default"
            secureTextEntry
            onChangeText={(text) =>
              dispatch({
                type: 'changed',
                payload: {
                  type: 'password',
                  value: text.toLowerCase(),
                },
              })
            }
            value={state.password}
            style={tailwind('bg-gray-200 w-full p-4 rounded-md')}
          />
        </View>
        <View>
          <Text style={tailwind('py-4 text-red-600')}>&nbsp;{state.error}</Text>
        </View>
        {state.loading ? (
          <ActivityIndicator />
        ) : (
          <Button onPress={handleSubmit}>
            {state.method === 'signIn' ? "S'inscrire" : 'Se connecter'}
          </Button>
        )}
      </Card>
      <Button
        variant="tertiary"
        style={tailwind('mt-4')}
        onPress={toggleMethod}>
        {state.method === 'signIn' ? 'Déjà un compte ?' : 'Créer un compte'}
      </Button>
    </Screen>
  );
};

export default SignInScreen;
