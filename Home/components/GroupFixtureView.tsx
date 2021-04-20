import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator, List} from 'react-native-paper';
import tailwind from 'tailwind-rn';
import TeamView from './TeamView';
import ResultListView from './ResultListView';
import Card from '../../Shared/components/Card';
import ScoreView from './ScoreView';
import {Fixture} from '../../Fixture/types';
import {useLazyQuery} from '@apollo/client';
import {SEARCH_GROUP_FIXTURE} from '../../Fixture/utils';

interface GroupFixtureViewProps {
  fixture: Fixture;
}
const points = {
  EXACT_SCORE: '+3 points',
  EXACT_RESULT: '+1 point',
  WRONG_RESULT: '+0 point',
};

const GroupFixtureView = ({fixture, groupId}: GroupFixtureViewProps) => {
  const [query, {loading, data, called, error}] = useLazyQuery(
    SEARCH_GROUP_FIXTURE,
  );
  const [state, setState] = useState(false);

  const handlePress = () => {
    console.log(state);
    if (state === false) {
      query({
        variables: {
          groupId,
          fixtureId: fixture.id,
        },
      });
    }
    setState((s) => !s);
  };
  return (
    <Card style={tailwind('bg-white m-2 p-2')}>
      <View style={tailwind('flex-row items-start py-4')}>
        <TeamView team={fixture.homeTeam} />
        <View style={tailwind('flex-1')}>
          <ScoreView fixture={fixture} />
        </View>
        <TeamView team={fixture.awayTeam} />
      </View>
      <List.Accordion title="Pronostics" onPress={handlePress} expanded={state}>
        {loading && <ActivityIndicator style={{marginVertical: 20}} />}
        {data?.fixture?.predictions?.map((p, i) => (
          <List.Item
            title={p?.user?.displayName}
            description={`${p?.homeScore} - ${p?.awayScore}`}
            right={(props) => (
              <View style={{display: 'flex', justifyContent: 'center'}}>
                <Text {...props}>{points[p?.attributes[0]?.type]}</Text>
              </View>
            )}
          />
        ))}
      </List.Accordion>
    </Card>
  );
};

export default GroupFixtureView;
