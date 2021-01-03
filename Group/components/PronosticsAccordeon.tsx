import React, {useState} from 'react';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import AccordionToggle from './AccordionToggle';
import ParticipantRow from './ParticipantRow';
import {Fixture} from '../../Fixture/types';

interface PronosticsAccordionProps {
  fixture: Fixture;
  style?: string;
}
const PronosticsAccordion = ({fixture, style}: PronosticsAccordionProps) => {
  const [state, setState] = useState(false);
  const handleChange = (open: boolean) => setState(open);
  return (
    <View style={{...tailwind('bg-gray-200 rounded-md mt-2'), ...style}}>
      <View style={tailwind(' p-2 flex-row justify-between items-center')}>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold')}>Pronostics</Text>
        </View>
        <AccordionToggle onChange={handleChange} />
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

export default PronosticsAccordion;
