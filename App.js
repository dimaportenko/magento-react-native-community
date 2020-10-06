/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigation/Navigation';

const App: () => React$Node = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Navigation />
  );
};


export default App;
