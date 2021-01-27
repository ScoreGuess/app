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
import Card from '../../Shared/components/Card';
import Button from '../../Shared/components/Button';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

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
        <View style={tailwind('px-2  pb-8 mt-4')}>
          <Card style={tailwind('bg-white')}>
            <Card.Header
              title="Groupes"
              icon={faUserFriends}
              color="red-600"
              desc="Retrouve ton classement dans tes groupes"
            />
            {groups.map((group, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  navigate('Group', {group});
                }}>
                <View
                  style={tailwind(
                    ' flex-row justify-between items-center p-4 border-b-2 border-gray-300',
                  )}>
                  <View style={tailwind('flex-1')}>
                    <View>
                      <Text style={tailwind('mb-1 font-bold')}>
                        {group.name}
                      </Text>
                    </View>
                    <View style={tailwind('flex-row')}>
                      <Text style={tailwind('mb-1 mr-1 text-gray-600')}>
                        {group.size} participants
                      </Text>
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
              </Pressable>
            ))}
            <View style={tailwind('my-4 p-4')}>
              <Button
                style={tailwind('mb-4')}
                onPress={() => {
                  navigate('Add');
                }}>
                Créer un groupe
              </Button>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupsView;
