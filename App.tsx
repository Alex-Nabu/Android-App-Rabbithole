import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    requestPermissions();
    configurePushNotifications();
  }, []);

  const requestPermissions = async () => {
    try {
      const grantedBluetooth = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.BLUETOOTH_ALWAYS
          : PERMISSIONS.ANDROID.BLUETOOTH_ADMIN
      );
      const grantedLocation = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      const grantedCamera = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
      const grantedMicrophone = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO
      );
      const grantedPhone = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHONE_CALL
          : PERMISSIONS.ANDROID.READ_PHONE_STATE
      );
      const grantedSMS = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.SMS
          : PERMISSIONS.ANDROID.SEND_SMS
      );
      const grantedNotifications = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.NOTIFICATIONS
          : PERMISSIONS.ANDROID.POST_NOTIFICATIONS
      );
      console.log('Permissions granted:', {
        grantedBluetooth,
        grantedLocation,
        grantedCamera,
        grantedMicrophone,
        grantedPhone,
        grantedSMS,
        grantedNotifications,
      });
    } catch (error) {
      console.warn('Permission request error:', error);
    }
  };

  const configurePushNotifications = async () => {
    // Request Notification Permissions
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      // Handle Notification when the app is in the foreground
      messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

      // Handle Notification when the app is in background or killed
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

      // Handle Notification when the app is opened from a quit state
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
      });

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage.notification);
          }
        });
    } else {
      console.log('Notification permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(0, 0, 0, 0.0)"
        barStyle="dark-content"
      />
      <WebView source={{ uri: 'https://rabbithole.fm' }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
