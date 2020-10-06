/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesScreen } from '../components/categories/CategoriesScreen';
import * as routes from './routes';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.NAVIGATION_CATEGORIES_ROUTE}
      component={CategoriesScreen}
      options={{ title: 'Categories' }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
