/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoryScreen } from '../components/category/CategoryScreen';

import * as routes from './types'

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.NAVIGATION_CATEGORIES_ROUTE}
      component={CategoryScreen}
      options={{ title: 'Categories' }}
    />
  </Stack.Navigator>
);

export const Navigation = () => {

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <RootStack />
    </NavigationContainer>
  );
};
