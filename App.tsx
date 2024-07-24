import React from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';

// useEffect(() => {
//   SplashScreen.hide();
// }, []);
//

const App = () => {
//   useEffect(() => {
//   SplashScreen.hide();
// }, []);

  return <WebView source={{ uri: 'https://rabbithole.fm' }} />;
};

export default App;
