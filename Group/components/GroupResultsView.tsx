import React from 'react';
import tailwind from 'tailwind-rn';
import {View} from 'react-native';
import GroupFixtureView from '../../Home/components/GroupFixtureView';
import GroupedFixtureList from '../../Home/containers/GroupFixtureList';
import {Group} from '../types';

interface GroupResultsViewProps {
  group: Group;
}

const GroupResultsView = ({group}: GroupResultsViewProps) => {
  return (
    <View style={tailwind(' h-full justify-center w-full')}>
      <View style={tailwind('flex-1')}>
        <GroupedFixtureList groupId={group.id}>
          {(fixture) => (
            <GroupFixtureView
              key={fixture.id}
              fixture={fixture}
            />
          )}
        </GroupedFixtureList>
      </View>
    </View>
  );
};

export default GroupResultsView;
