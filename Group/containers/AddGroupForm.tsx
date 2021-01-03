import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import tailwind from 'tailwind-rn';
import Button from '../../Shared/components/Button';
import Card from '../../Shared/components/Card';
import Screen from '../../Shared/components/Screen';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation} from '@apollo/client';
import {SEARCH_GROUPS} from './GroupsView';
import Radio from '../../Shared/components/Radio';

const CREATE_GROUP = gql`
  mutation groupCreation($name: String!) {
    createGroup(name: $name) {
      id
    }
  }
`;
const AddGroupForm = ({}) => {
  const [state, setState] = useState({
    name: null,
    duration: 5,
  });
  const {navigate} = useNavigation();
  const [mutation] = useMutation(CREATE_GROUP, {
    refetchQueries: [{query: SEARCH_GROUPS}],
  });
  return (
    <Screen style={tailwind('bg-gray-100 p-2')}>
      <Card style={tailwind('bg-white p-2 pt-8')}>
        <Text style={tailwind('mb-2')}>Donne un nom à ton groupe</Text>
        <TextInput
          onChangeText={(text) => setState((s) => ({...s, name: text}))}
          value={state.name}
          style={tailwind('bg-gray-300 mb-4 w-full p-4 rounded-lg')}
        />
        {/* <Text style={tailwind('my-2')}>Quelle durée?</Text>
        <View style={tailwind('flex-row flex-wrap mb-8')}>
          <Radio
            onPress={() => setState((s) => ({...s, duration: 8}))}
            checked={state.duration === 8}
            display="Pas de palais"
            style={tailwind('flex-1')}
          />
          <Radio
            onPress={() => setState((s) => ({...s, duration: 5}))}
            checked={state.duration === 5}
            display="5 journées"
            style={tailwind('flex-1 mr-1')}
          />
          <Radio
            onPress={() => setState((s) => ({...s, duration: 8}))}
            checked={state.duration === 8}
            display="8 journées"
            style={tailwind('flex-1')}
          />
        </View>*/}
        <Button
          onPress={async () => {
            try {
              await mutation({
                variables: {
                  name: state.name,
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
