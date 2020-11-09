/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesScreen } from '../components/categories/CategoriesScreen';
import * as routes from './routes';
import { ProductListScreen } from '../components/products/ProductListScreen';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      headerBackTitleVisible: false,
    })}>
    <Stack.Screen
      name={routes.NAVIGATION_CATEGORIES_ROUTE}
      component={CategoriesScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Categories',
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_PRODUCTS_ROUTE}
      component={ProductListScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Products',
      })}
    />
  </Stack.Navigator>
);

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
