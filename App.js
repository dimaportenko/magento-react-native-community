/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from './src/navigation/Navigation';
import { apolloClient } from './src/apollo/client';
import { persistor, store } from './src/redux/store';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={apolloClient}>
          <Navigation />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
