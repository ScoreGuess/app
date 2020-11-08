import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React, {useState} from 'react';
import GroupNavigation from './GroupNavigation';
import LeaderBoardView from './LeaderBoardView';
import GroupResultsView from './GroupResultsView';

const GroupView = ({route}) => {
  const [index, setIndex] = useState(0);
  const {group} = route.params;

  const handleChange = (index) => {
    setIndex(index);
  };
  return (
    <View style={tailwind('bg-gray-100 h-full')}>
      <GroupNavigation onChange={handleChange} />
      {index === 0 && <LeaderBoardView group={group} />}
      {index === 1 && <GroupResultsView group={group} />}
    </View>
  );
};

export default GroupView;
