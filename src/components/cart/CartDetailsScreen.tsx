/**
 * Created by Dima Portenko on 02.04.2021
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useCartDetails } from '../../logic/cart/useCartDetails';
import { ActivityIndicator } from 'react-native';

interface CartDetailsScreenProps {}

export const CartDetailsScreen = (props: CartDetailsScreenProps) => {
  const { getCartDetails, loading, cartItems } = useCartDetails();

  useEffect(() => {
    getCartDetails();
  }, []);

  useEffect(() => {
    console.log({ cartItems });
  }, [cartItems]);

  if (loading) {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View flex center>
      <Text>Cart Details Screen</Text>
    </View>
  );
};
