import React from 'react';
import tailwind from 'tailwind-rn';
import {View} from 'react-native';
import GroupFixtureView from '../../Home/components/GroupFixtureView';
import GroupedFixtureList from '../../Home/containers/GroupFixtureList';
import {Group} from '../types';
import {GROUP_NAVIGATION_HEADER_HEIGHT} from './GroupNavigation';

interface GroupResultsViewProps {
  group: Group;
  onScroll: any;
  y: any;
}

const GroupResultsView = ({group, onScroll, y}: GroupResultsViewProps) => {
  return (
    <GroupedFixtureList y={y} groupId={group.id} onScroll={onScroll}>
      {(fixture) => <GroupFixtureView key={fixture.id} fixture={fixture} />}
    </GroupedFixtureList>
  );
};

export default GroupResultsView;
