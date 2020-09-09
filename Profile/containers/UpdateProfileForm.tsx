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
      <View style={tailwind('flex-row items-center px-4 mt-8')}>
        <View style={tailwind('rounded-lg p-3 mr-4 bg-red-600')}>
          <FontAwesomeIcon
            icon={faSlidersH}
            color={getColor('white')}
            size={24}
          />
        </View>
        <View>
          <Text style={tailwind('text-lg font-bold mb-1')}>Profil</Text>
          <Text style={tailwind('text-gray-600')}>
            Modifie les infos de ton compte ici
          </Text>
        </View>
      </View>
      <View style={tailwind('mt-8 border-t-2 border-gray-200 pt-4')}>
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
