import React, {useReducer} from 'react';
import Screen from '../../Shared/components/Screen';
import {Button, Card, HelperText, TextInput, Title} from 'react-native-paper';

import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

import tailwind from 'tailwind-rn';

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
        <Title>ScoreGuess</Title>
        <View style={tailwind(' mt-4')}>
          <TextInput
            textAlign="left"
            mode="outlined"
            label="Adresse email"
            keyboardType="email-address"
            error={state.error === 'auth/user-not-found'}
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
          />
        </View>
        <View style={tailwind('mt-4')}>
          <TextInput
            mode="outlined"
            textAlign="left"
            error={state.error === 'auth/wrong-password'}
            label="Mot de passe"
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
          />
        </View>
        <HelperText
          dataDetectorType="none"
          visible={state.error != null}
          type="error">
          {state.error}
        </HelperText>
        {state.loading ? (
          <ActivityIndicator />
        ) : (
          <Button mode="contained" onPress={handleSubmit}>
            {state.method === 'signIn' ? "S'inscrire" : 'Se connecter'}
          </Button>
        )}
      </Card>
      <Button style={tailwind('mt-4')} onPress={toggleMethod}>
        {state.method === 'signIn' ? 'Déjà un compte ?' : 'Créer un compte'}
      </Button>
    </Screen>
  );
};

export default SignInScreen;
