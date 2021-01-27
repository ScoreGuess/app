import {View, Text, ActivityIndicator} from 'react-native';
import tailwind from 'tailwind-rn';
import React, {useState} from 'react';
import GroupNavigation from './GroupNavigation';
import LeaderBoardView from './LeaderBoardView';
import GroupResultsView from './GroupResultsView';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './GroupsScreen';
import {useQuery, gql} from '@apollo/client';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Group'>;

interface GroupViewProps {
  route: ProfileScreenRouteProp;
}

const READ_GROUP = gql`
  query groupRead($groupId: String!) {
    group(groupId: $groupId) {
      id
      name
      createdAt
      participants {
        id
        email
        displayName
        predictions {
          fixture {
            startDate
          }
          attributes {
            type
          }
        }
      }
    }
  }
`;

const GroupView = ({route}: GroupViewProps) => {
  const {group} = route.params;
  const {data, error, loading} = useQuery(READ_GROUP, {
    variables: {
      groupId: group.id,
    },
  });
  const [index, setIndex] = useState(0);

  const handleChange = (i: number) => {
    setIndex(i);
  };
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={tailwind('bg-gray-100 h-full')}>
      <GroupNavigation onChange={handleChange} />
      {index === 0 && <LeaderBoardView group={data.group} />}
      {index === 1 && <GroupResultsView group={data.group} />}
    </View>
  );
};
/*


 */
export default GroupView;
