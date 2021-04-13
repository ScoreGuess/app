import {View, ActivityIndicator, Animated} from 'react-native';
import tailwind from 'tailwind-rn';
import React, {useState} from 'react';
import GroupNavigation, {
  GROUP_NAVIGATION_HEADER_HEIGHT,
} from './GroupNavigation';
import {Divider} from "react-native-paper";
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
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(
    scrollY,
    0,
    GROUP_NAVIGATION_HEADER_HEIGHT,
  );
  const translateY = diffClamp.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
  });

  const {data, loading} = useQuery(READ_GROUP, {
    variables: {
      groupId: group.id,
    },
  });
  const [index, setIndex] = useState(0);

  const handleChange = (i: number) => {
    setIndex(i);
  };

  const handleScroll = (e) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={tailwind('bg-gray-100 h-full')}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          elevation: 4,
          zIndex: 100,
          transform: [
            {
              translateY,
            },
          ],
        }}>
        <GroupNavigation onChange={handleChange} />
        <Divider/>
      </Animated.View>
      {index === 0 && (
        <LeaderBoardView group={data.group} onScroll={handleScroll} />
      )}
      {index === 1 && (
        <GroupResultsView
          group={data.group}
          onScroll={handleScroll}
          y={diffClamp}
        />
      )}
    </View>
  );
};
/*


 */
export default GroupView;
