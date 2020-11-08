import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import TeamView from './TeamView';
import ResultListView from './ResultListView';
import Card from '../../Shared/components/Card';
import ScoreView from './ScoreView';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

const AccordeonToggle = ({onChange, defaultOpen}) => {
  const [state, setState] = useState(defaultOpen);
  useEffect(() => {
    onChange(state);
  }, [onChange, state]);
  const handlePress = () => {
    setState((s) => !s);
  };
  return (
    <Pressable onPress={handlePress}>
      <View
        style={tailwind(
          'w-8 h-8 bg-gray-400 rounded-full flex-row items-center justify-center',
        )}>
        <FontAwesomeIcon
          color={getColor('gray-800')}
          icon={state === true ? faChevronDown : faChevronUp}
          size={16}
        />
      </View>
    </Pressable>
  );
};
AccordeonToggle.defaultProps = {
  onChange: () => {},
  defaultOpen: false,
};

const ParticipantScore = ({score}) => {
  const colors = {
    0: 'red',
    1: 'yellow',
    3: 'green',
  };
  return (
    <View
      style={tailwind(
        `w-8 h-8 bg-${colors[score]}-100 rounded-full flex-row items-center justify-center`,
      )}>
      <Text style={tailwind(`text-${colors[score]}-600 font-bold`)}>
        {score}
      </Text>
    </View>
  );
};

const ParticipantRow = ({participant}) => {
  return (
    <View style={tailwind(' py-2 flex-row items-center')}>
      <View style={tailwind('flex-1')}>
        <Text>{participant.user.displayName ?? participant.user.id}</Text>
      </View>
      <View style={tailwind('flex-row items-center')}>
        <Text style={tailwind('mr-2')}>
          {participant.homeScore} - {participant.awayScore}
        </Text>
        <ParticipantScore score={participant.score} />
      </View>
    </View>
  );
};
const GroupFixtureView = ({fixture, group}) => (
  <Card style={tailwind('bg-white m-2 pt-4')}>
    <View style={tailwind('flex-row items-start py-4')}>
      <TeamView team={fixture.homeTeam} />
      <View style={tailwind('flex-1')}>
        <ScoreView fixture={fixture} />
      </View>
      <TeamView team={fixture.awayTeam} />
    </View>
    {fixture.status === 'FINISHED' && fixture.prediction != null && (
      <View style={tailwind(' border-t-2 border-gray-200 px-2 mb-2')}>
        {/*<View style={tailwind('flex-row justify-between py-4 mt-4')}>
          <Text style={tailwind('font-bold flex-1')}>Pronostic</Text>
          <View style={tailwind('flex-row')}>
            <Text style={tailwind('font-bold')}>
              {fixture.prediction.homeScore}
            </Text>
            <Text style={tailwind('font-bold')}>&nbsp;&ndash;&nbsp;</Text>
            <Text style={tailwind('font-bold')}>
              {fixture.prediction.awayScore}
            </Text>
          </View>
        </View>*/}
        <ResultListView
          prediction={fixture.prediction}
          style={tailwind('bg-gray-200 my-2 px-2 rounded-md')}
        />
        <PronosticsAccordeon fixture={fixture} />
      </View>
    )}
  </Card>
);

const PronosticsAccordeon = ({fixture}) => {
  const [state, setState] = useState(false);
  const handleChange = (open) => setState(open);
  return (
    <View style={tailwind('bg-gray-200 rounded-md ')}>
      <View style={tailwind(' p-2 flex-row justify-between items-center')}>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold')}>Pronostics</Text>
        </View>
        <AccordeonToggle onChange={handleChange} />
      </View>
      {state && (
        <View style={tailwind('p-2 my-2')}>
          {fixture.predictions
            .map((p) => {
              const attribute = p.attributes?.[0]?.type;
              let score = 0;
              if (attribute === 'EXACT_RESULT') score = 1;
              if (attribute === 'EXACT_SCORE') score = 3;
              return {
                ...p,
                score,
              };
            })
            .sort((a, b) => {
              return b.score - a.score;
            })
            .map((participant, i) => (
              <ParticipantRow key={i} participant={participant} />
            ))}
        </View>
      )}
    </View>
  );
};
export default GroupFixtureView;
