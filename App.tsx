import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS } from 'react-native-permissions';
import firebase from '@react-native-firebase/app';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    // requestPermissions();
    configurePushNotifications();
  }, []);

  const requestPermissions = async () => {
    try {
      const grantedBluetoothScan = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
          : PERMISSIONS.ANDROID.BLUETOOTH_SCAN
      );
      const grantedBluetoothConnect = await request(
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
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
        grantedBluetoothScan,
        grantedBluetoothConnect,
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

  const configurePushNotifications = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      showToast(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });

    requestUserPermission();
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Notification permission granted.');
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
      <WebView source={{ uri: 'https://rabbithole.fm' }} style={styles.webview}
        geolocationEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true} />

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
