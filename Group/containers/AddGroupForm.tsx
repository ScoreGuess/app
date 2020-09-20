import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import tailwind from 'tailwind-rn';
import Button from '../../Shared/components/Button';
import Card from '../../Shared/components/Card';
import Screen from '../../Shared/components/Screen';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation} from '@apollo/client';
import {SEARCH_GROUPS} from './GroupsView';

const CREATE_GROUP = gql`
  mutation groupCreation($name: String!) {
    createGroup(name: $name) {
      id
    }
  }
`;
const AddGroupForm = ({}) => {
  const [name, setName] = useState(null);
  const {navigate} = useNavigation();
  const [mutation] = useMutation(CREATE_GROUP, {
    refetchQueries: [{query: SEARCH_GROUPS}],
  });
  return (
    <Screen style={tailwind('bg-gray-100 p-2')}>
      <Card style={tailwind('bg-white p-2 pt-8')}>
        <Text style={tailwind('mb-2')}>Donne un nom à ton groupe</Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          value={name}
          style={tailwind('bg-gray-300 mb-4 w-full p-4 rounded-lg')}
        />
        <Button
          onPress={async () => {
            try {
              await mutation({
                variables: {
                  name,
                },
              });
              navigate('Home');
            } catch (e) {
              console.log(e);
            }
          }}>
          C'est parti !
        </Button>
      </Card>
    </Screen>
  );
};

export default AddGroupForm;
