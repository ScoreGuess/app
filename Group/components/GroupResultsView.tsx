import React from 'react';
import GroupFixtureView from '../../Home/components/GroupFixtureView';
import GroupedFixtureList from '../../Home/containers/GroupFixtureList';
import {Group} from '../types';

interface GroupResultsViewProps {
  group: Group;
  onScroll: any;
  y: any;
}

const GroupResultsView = ({group, onScroll, y}: GroupResultsViewProps) => {
  return (
    <GroupedFixtureList y={y} groupId={group.id} onScroll={onScroll}>
      {(fixture) => (
        <GroupFixtureView
          key={fixture.id}
          groupId={group.id}
          fixture={fixture}
        />
      )}
    </GroupedFixtureList>
  );
};

export default GroupResultsView;
