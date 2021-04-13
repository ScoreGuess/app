import AddPredictionForm from '../../Prediction/components/AddPredictionForm';
import React from 'react';
import {Card} from 'react-native-paper';
import {Fixture} from '../../Fixture/types';
import InProgressFixtureView from '../../Fixture/components/InProgressFixtureView';
import FinishedFixtureView from '../../Fixture/components/FinishedFixtureView';

interface FixtureViewProps {
  fixture: Fixture;
}

const FixtureView = ({fixture}: FixtureViewProps) => (
  <Card>
    {fixture.status === 'PLANNED' && <AddPredictionForm fixture={fixture} />}
    {fixture.status === 'IN_PROGRESS' && (
      <InProgressFixtureView fixture={fixture} />
    )}
    {fixture.status === 'FINISHED' && <FinishedFixtureView fixture={fixture} />}
  </Card>
);
export default FixtureView;
