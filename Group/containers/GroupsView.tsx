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

const GROUP_SEARCH = gql`
  query groupSearch {
    groups {
      id
      name
      participants {
        id
        email
        displayName
        predictions {
          attributes {
            type
          }
        }
      }
    }
  }
`;

const GroupsView = (props) => {
  const {loading, data, error} = useQuery(GROUP_SEARCH);
  const {navigate} = useNavigation();
  if (loading) {
    return <ActivityIndicator />;
  }
  const groups = data?.groups ?? [{participants: []}];

  return (
    <ScrollView style={tailwind('p-2')}>
      <Card style={tailwind(' bg-white')}>
        <Card.Header
          title="Groupes"
          icon={faUserFriends}
          color="red-600"
          desc="Retrouve ton classement dans tes groupes patitateta patatata pergerg e azd gre hy(tzd pjnirnverv"
        />
        {groups.map((group, i) => (
          <Pressable
            key={i}
            onPress={() => {
              navigate('Group', {group});
            }}>
            <View
              style={tailwind(' flex-row justify-between items-center p-4')}>
              <View>
                <Text>{group.name}</Text>
                <Text>{group.participants.length} participants</Text>
              </View>
              <Pressable>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color={getColor('red-600')}
                  size={16}
                />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </Card>
      <Card style={tailwind('mt-4 bg-white p-4')}>
        <Button style={tailwind('mb-4')}>Créer un groupe</Button>
        <Button>Joindre un groupe</Button>
      </Card>
    </ScrollView>
  );
};

export default GroupsView;
