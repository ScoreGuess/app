import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import Button from '../../Shared/components/Button';
import auth from '@react-native-firebase/auth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import Card from '../../Shared/components/Card';

const UpdateProfileForm = ({}) => {
  const user = auth().currentUser;
  const [displayName, setDisplayName] = useState(user.displayName);
  return (
    <Card style={tailwind('bg-white')}>
      <Card.Header
        title="Profile"
        desc="Modifie les infos de ton compte ici"
        icon={faSlidersH}
        color="red-600"
      />
      <View style={tailwind('')}>
        <View style={tailwind('p-4')}>
          <Text style={tailwind('mb-2')}>Ton email</Text>
          <View style={tailwind('bg-gray-300 mb-4 p-4 rounded-lg')}>
            <Text style={tailwind('w-full text-gray-600')}>{user.email}</Text>
          </View>
          <Text style={tailwind('mb-2')}>Ton surnom</Text>
          <TextInput
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
            style={tailwind('bg-gray-300 mb-4 w-full p-4 rounded-lg')}
          />
          <Button
            variant="primary"
            onPress={() => {
              user.updateProfile({
                displayName,
              });
            }}>
            Enregistrer
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default UpdateProfileForm;
