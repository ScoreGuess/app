import React, {useReducer} from 'react';
import {gql, useMutation} from '@apollo/client';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import {Image, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {SEARCH_FIXTURES} from '../../Home/containers/FixtureList';
import BetterScoreInput from './BetterScoreInput';

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

const HorizontalTeamView = ({team}) => (
  <View style={tailwind('flex-row flex-1 items-center')}>
    <Image style={{width: 32, height: 32}} source={{uri: team.logo}} />
    <Text style={tailwind('ml-2')}>{team.shortName}</Text>
  </View>
);

const AddPredictionForm = ({fixture}) => {
  const [state, dispatch] = useReducer(reducer, fixture, init);
  const [mutation] = useMutation(USER_UPDATE_PREDICTION, {
    refetchQueries: [
      {query: SEARCH_FIXTURES, variables: {matchDay: fixture.matchDay}},
    ],
  });

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
    <View style={tailwind('w-full py-2 px-4 mt-1 mb-2')}>
      <View style={tailwind('flex-col mb-2')}>
        <View style={tailwind('flex-row items-center mb-5')}>
          <HorizontalTeamView team={fixture.homeTeam} />
          <BetterScoreInput
            value={state.homeScore}
            onChange={handleChangePrediction('homeScore')}
          />
        </View>
        <View style={tailwind('flex-row items-center')}>
          <HorizontalTeamView team={fixture.awayTeam} />
          <BetterScoreInput
            value={state.awayScore}
            onChange={handleChangePrediction('awayScore')}
          />
        </View>
      </View>
    </View>
  );
};
export default AddPredictionForm;
