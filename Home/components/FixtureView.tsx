import tailwind from 'tailwind-rn';
import AddPredictionForm from '../../Prediction/components/AddPredictionForm';
import React from 'react';
import Card from '../../Shared/components/Card';
import {Fixture} from '../../Fixture/types';
import InProgressFixtureView from '../../Fixture/components/InProgressFixtureView';
import FinishedFixtureView from '../../Fixture/components/FinishedFixtureView';

interface FixtureViewProps {
  fixture: Fixture;
}

const FixtureView = ({fixture}: FixtureViewProps) => (
  <Card style={tailwind('bg-white m-2 pt-4')}>
    {fixture.status === 'PLANNED' && <AddPredictionForm fixture={fixture} />}
    {fixture.status === 'IN_PROGRESS' && (
      <InProgressFixtureView fixture={fixture} />
    )}
    {fixture.status === 'FINISHED' && <FinishedFixtureView fixture={fixture} />}
  </Card>
);
export default FixtureView;
