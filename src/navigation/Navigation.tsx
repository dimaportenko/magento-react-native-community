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

type RootStackParamList = {
  NAVIGATION_CATEGORIES_ROUTE: {
    title: string | undefined;
    categoryId: number;
  };
  NAVIGATION_PRODUCTS_ROUTE: {
    title: string | undefined;
    categoryId: number;
  };
  NAVIGATION_PRODUCT_DETAILS_ROUTE: {
    title: string | undefined;
    sku: string;
  };
};

export type CategoriesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NAVIGATION_CATEGORIES_ROUTE'
>;

export type CategoriesScreenRouteProp = RouteProp<
  RootStackParamList,
  'NAVIGATION_CATEGORIES_ROUTE'
>;

export type ProductsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NAVIGATION_PRODUCTS_ROUTE'
>;

export type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'NAVIGATION_PRODUCTS_ROUTE'>;

export type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'NAVIGATION_PRODUCT_DETAILS_ROUTE'
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
