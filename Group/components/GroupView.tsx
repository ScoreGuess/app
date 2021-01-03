import {View} from 'react-native';
import tailwind from 'tailwind-rn';
import React, {useState} from 'react';
import GroupNavigation from './GroupNavigation';
import LeaderBoardView from './LeaderBoardView';
import GroupResultsView from './GroupResultsView';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './GroupsScreen';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Group'>;

interface GroupViewProps {
  route: ProfileScreenRouteProp;
}
const GroupView = ({route}: GroupViewProps) => {
  const [index, setIndex] = useState(0);
  const {group} = route.params;

  const handleChange = (i: number) => {
    setIndex(i);
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
