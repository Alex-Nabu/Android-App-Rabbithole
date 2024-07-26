import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, StyleSheet, View } from 'react-native';

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <View style={styles.container}>
    <StatusBar animated={true} backgroundColor="#FFFFFF" barStyle="dark-content" />
    <WebView source={{ uri: 'https://rabbithole.fm' }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Set to your primary color
  },
  webview: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding for status bar on Android
  },
});

export default App;
