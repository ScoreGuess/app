import React, {useEffect, useState} from 'react';
import {Alert, AppState, Switch, Text, TextInput, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import Button from '../../Shared/components/Button';
import auth from '@react-native-firebase/auth';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import Card from '../../Shared/components/Card';
import messaging from '@react-native-firebase/messaging';
import {requestPermissions} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDebounce} from '../../Shared/utils';

enum NotificationStatus {
  DENIED,
  SUBSCRIBED,
  UNSUBSCRIBED,
}

const UpdateProfileForm = ({style}) => {
  const user = auth().currentUser;
  const [displayName, setDisplayName] = useState(user.displayName);
  const [status, setStatus] = useState(NotificationStatus.SUBSCRIBED);
  const updateNotificationStatus = async () => {
    const notificationsStatus = await requestPermissions();
    if (
      notificationsStatus === messaging.AuthorizationStatus.DENIED ||
      notificationsStatus === messaging.AuthorizationStatus.NOT_DETERMINED
    ) {
      setStatus(NotificationStatus.DENIED);
      return;
    }
    const localStatus = await AsyncStorage.getItem('REMINDERS');
    if (localStatus === null) {
      setStatus(NotificationStatus.UNSUBSCRIBED);
    } else {
      setStatus(Number.parseInt(localStatus, 10));
    }
  };

  useEffect(() => {
    updateNotificationStatus().then();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', updateNotificationStatus);
    return () => {
      AppState.removeEventListener('change', updateNotificationStatus);
    };
  }, []);

  const toggleReminders = async () => {
    // on ne souscrit volontairement pas aux promesses de messaging
    // comme ça le toggle se met directement à jour.
    if (status === NotificationStatus.DENIED) {
      Alert.alert(
        'Les notifications sont désactivées',
        'Il faut que tu les réactives depuis les paramètres de ton téléphone',
      );
    } else if (status === NotificationStatus.UNSUBSCRIBED) {
      setStatus(NotificationStatus.SUBSCRIBED);
      messaging().subscribeToTopic('REMINDERS').then();
      AsyncStorage.setItem(
        'REMINDERS',
        String(NotificationStatus.SUBSCRIBED),
      ).then();
    } else {
      setStatus(NotificationStatus.UNSUBSCRIBED);
      messaging().unsubscribeFromTopic('REMINDERS').then();
      AsyncStorage.setItem(
        'REMINDERS',
        String(NotificationStatus.UNSUBSCRIBED),
      ).then();
    }
  };

  const debounced = useDebounce(displayName, 2000);
  useEffect(() => {
    if (debounced !== user?.displayName) {
      user.updateProfile({displayName: debounced});
    }
  }, [debounced]);

  return (
    <Card style={{...tailwind('bg-white'), ...style}}>
      <Card.Header
        title="Profil"
        desc="Modifie les infos de ton compte ici"
        icon={faSlidersH}
        color="red-600"
      />
      <View style={tailwind('p-4')}>
        <Text style={tailwind('mb-2')}>Ton surnom</Text>
        <TextInput
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          style={tailwind('bg-gray-300 mb-4 w-full p-4 rounded-lg')}
        />
        <View style={tailwind('flex-row items-center justify-between mb-2')}>
          <Text>Recevoir les alertes</Text>
          <Switch
            trackColor={{
              false: getColor('gray-300'),
              true: getColor('red-600'),
            }}
            thumbColor={getColor('white')}
            ios_backgroundColor={getColor('gray-300')}
            onValueChange={toggleReminders}
            value={status === NotificationStatus.SUBSCRIBED}
          />
        </View>
      </View>
      <Card.Footer>
        <Button
          variant="tertiary"
          onPress={() => {
            auth().signOut();
          }}>
          Se déconnecter
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default UpdateProfileForm;
