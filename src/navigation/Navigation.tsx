/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CategoriesScreen } from '../components/categories/CategoriesScreen';
import * as routes from './routes';
import { ProductListScreen } from '../components/products/ProductListScreen';
import { ProductDetailsScreen } from '../components/products/ProductDetailsScreen';
import { useCart } from '../logic/cart/useCart';

export type RootStackParamList = {
  [routes.NAVIGATION_CATEGORIES_ROUTE]: {
    categoryId: number | undefined;
    title: string;
  };
  [routes.NAVIGATION_PRODUCT_DETAILS_ROUTE]: {
    sku: string;
    title: string;
  };
  [routes.NAVIGATION_PRODUCTS_ROUTE]: {
    categoryId: number;
    title: string;
  };
};

export type CategoriesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof routes.NAVIGATION_CATEGORIES_ROUTE
>;

export type CategoriesScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_CATEGORIES_ROUTE
>;

export type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof routes.NAVIGATION_PRODUCTS_ROUTE
>;

export type ProductListScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_PRODUCTS_ROUTE
>;

export type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_PRODUCT_DETAILS_ROUTE
>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { cartId } = useCart();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerBackTitleVisible: false,
        headerTintColor: 'black',
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
      <Stack.Screen
        name={routes.NAVIGATION_PRODUCT_DETAILS_ROUTE}
        component={ProductDetailsScreen}
        options={({ navigation, route }) => ({
          title: route?.params?.title ?? 'Product Details',
        })}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
