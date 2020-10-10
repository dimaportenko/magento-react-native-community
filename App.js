/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow local
 */

import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from './src/navigation/Navigation';
import { apolloClient } from './src/apollo/client';


const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Navigation />
    </ApolloProvider>
  );
};

export default App;
