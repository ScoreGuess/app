import React from 'react';
import Screen from '../../Shared/components/Screen';
import Card from '../../Shared/components/Card';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {gql, useLazyQuery, useMutation, useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';
import Button from '../../Shared/components/Button';
import {useNavigation} from '@react-navigation/native';
import {SEARCH_FIXTURES} from '../../Home/containers/FixtureList';
import {SEARCH_GROUPS} from './GroupsView';

const READ_GROUP = gql`
  query readGroup($groupId: String!) {
    group(groupId: $groupId) {
      id
      name

      author {
        id
        displayName
      }
    }
  }
`;
const JOIN_GROUP = gql`
  mutation joinGroup($groupId: String!) {
    joinGroup(groupId: $groupId) {
      id
    }
  }
`;
const JoinGroupForm = ({route}) => {
  const {groupId} = route?.params;
  const {reset} = useNavigation();
  const {data, loading} = useQuery(READ_GROUP, {
    variables: {groupId},
  });
  const [mutation] = useMutation(JOIN_GROUP, {
    variables: {groupId},
    refetchQueries: [{query: SEARCH_GROUPS}],
  });
  if (loading == true) return <ActivityIndicator />;

  const group = data?.group ?? null;
  if (group == null) return <Text>Allo Houston, on a eu un problème</Text>;
  return (
    <Screen>
      <ScrollView style={tailwind('p-2')}>
        <Card style={tailwind('p-4')}>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('mb-2')}>
              {group.author.displayName} t'invite à rejoindre {group.name}
            </Text>
            <Text>T'es de la partie ?</Text>
          </View>
          <Button
            onPress={async () => {
              try {
                await mutation({variables: {groupId}});
                reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              } catch {
                console.warn('something broke');
              }
            }}>
            Rejoindre ce groupe
          </Button>
        </Card>
      </ScrollView>
    </Screen>
  );
};

export default JoinGroupForm;
