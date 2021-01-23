import messaging from '@react-native-firebase/messaging';

export const requestPermissions = async () => {
  return await messaging().requestPermission();
};
