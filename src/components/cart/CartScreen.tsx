/**
 * Created by Dima Portenko on 28.03.2021
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useCartDetails } from '../../logic/cart/useCartDetails';

interface CartScreenProps {}

export const CartScreen = (props: CartScreenProps) => {
  const { getCartDetails } = useCartDetails();

  useEffect(() => {
    getCartDetails();
  }, [getCartDetails]);

  return <View />;
};
