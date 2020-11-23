/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native-markup-kit';
import { useProductDetails } from '../../logic/products/useProductDetails';

export const ProductDetailsScreen = () => {
  const { getProductDetails, loading } = useProductDetails({});

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <View flex center>
      <Text>Product Details</Text>
    </View>
  );
};
