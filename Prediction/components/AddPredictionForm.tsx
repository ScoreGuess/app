import React, {useReducer} from 'react';
import {gql, useMutation} from '@apollo/client';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import {View} from 'react-native';
import tailwind from 'tailwind-rn';
import ScoreInput from './ScoreInput';
import auth from '@react-native-firebase/auth';

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

// unable to make $userId: String work here 🤔
// fix it using template literals in gql
const USER_UPDATE_PREDICTION = gql`
  mutation createPrediction(
    $homeScore: Int!
    $awayScore: Int!
    $fixtureId: String!
  ) {
    userCreatePrediction(
      userId: "${auth().currentUser.uid}"
      fixtureId: $fixtureId
      homeScore: $homeScore
      awayScore: $awayScore
    ) {
      fixture {
        id
      }
    }
  }
`;
const initialState = {
  homeScore: null,
  awayScore: null,
};

const init = (fixture) => fixture?.prediction ?? initialState;

const AddPredictionForm = ({fixture}) => {
  const [state, dispatch] = useReducer(reducer, fixture, init);
  const [mutation] = useMutation(USER_UPDATE_PREDICTION);
  //will trigger only if the user update the score
  useUpdateEffect(() => {
    if (state.homeScore != null && state.awayScore != null) {
      try {
        mutation({
          variables: {
            fixtureId: fixture.id,
            homeScore: state.homeScore,
            awayScore: state.awayScore,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [state]);
  const handleChangePrediction = (team) => (value) => {
    dispatch({
      type: 'changed',
      payload: {
        team,
        value,
      },
    });
  };

  return (
    <View style={tailwind('w-full')}>
      <View style={tailwind('flex-row')}>
        <ScoreInput
          value={state.homeScore}
          onChange={handleChangePrediction('homeScore')}
        />
        <ScoreInput
          value={state.awayScore}
          onChange={handleChangePrediction('awayScore')}
        />
      </View>
    </View>
  );
};
export default AddPredictionForm;
