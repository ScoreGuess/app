import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {Card, Button, Avatar, List, Colors} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ListIcon from "react-native-paper/lib/typescript/components/List/ListIcon";

export const SEARCH_GROUPS = gql`
  query groupSearch {
    groups {
      id
      name
      createdAt
      size
    }
  }
`;

const GroupsView = () => {
  const {loading, data} = useQuery(SEARCH_GROUPS);
  const {navigate} = useNavigation();
  if (loading) {
    return <ActivityIndicator />;
  }

  const groups = data?.groups ?? [{participants: []}];
  return (
    <View style={tailwind('bg-gray-100 h-full')}>
      <ScrollView>
        <List.Section title="GROUPES">
          {groups.map((group, i) => (
            <List.Item
              title={group.name}
              description={`${group.size} participants`}
              key={i}
              left={()=> <List.Icon size={24} style={{backgroundColor:Colors.red100, borderRadius:99}} color={Colors.red500} icon="trophy"/>}
              onPress={() => {
                navigate('Group', {group});
              }}>
              <View
                style={tailwind(
                  ' flex-row justify-between items-center p-4 border-b-2 border-gray-300',
                )}>
                <View style={tailwind('flex-1')}>
                  <View style={tailwind('flex-row')}>
                    <Text style={tailwind('mb-1 mr-1 text-gray-600')}></Text>
                    <Text style={tailwind('mr-1')}>&middot;</Text>
                    <Text style={tailwind('mb-1 text-gray-600')}>
                      {moment(group.createdAt, 'YYYY-MM-DD').format('LL')}
                    </Text>
                  </View>
                </View>
                <Pressable style={tailwind('flex-initial')}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color={getColor('red-600')}
                    size={16}
                  />
                </Pressable>
              </View>
            </List.Item>
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

/*
 <Card>
            <Card.Title
              title="Groupes"
              subtitle="Retrouve ton classement dans tes groupes"
            />
            <Card.Content>
 */
export default GroupsView;
