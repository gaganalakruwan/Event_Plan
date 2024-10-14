import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect} from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import AuthStackNavigator from 'src/navigation/navigation'
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Spinner from './src/components/Spinner';
import AuthStackNavigator from 'navigation/routes';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';

export default function App() {

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'This app needs permission to show notifications',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      } else {
        console.log('Notification permission is not required for this Android version.');
      }
    };

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    getPermission();
    Notifications.registerRemoteNotifications();
    
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.log('User declined or has not granted permission');
      }
    };

    // Handle foreground notification
    const notificationReceivedForeground = Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification received in foreground:', notification);
        completion({ alert: true, sound: true, badge: false });
      }
    );

    // Handle notification opened by the user
    const notificationOpened = Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('Notification opened:', notification);
        completion();
      }
    );

    // Background notification handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage);
      // Optionally show a local notification when a message is received
      Notifications.postLocalNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        sound: 'default',
        badge: 1,
      });
    });

    // Request permissions and register for notifications
    requestUserPermission();

    // Cleanup event listeners on component unmount
    return () => {
      notificationReceivedForeground.remove();
      notificationOpened.remove();
      unsubscribe();
    };

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   console.log(
    //     JSON.stringify('>>>>>>>>>>', remoteMessage),
    //   );
    // });
    // return unsubscribe;
  });

  const getPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AuthStackNavigator />
          <Spinner />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
