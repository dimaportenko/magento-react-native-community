/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native-markup-kit';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { useRoute } from '@react-navigation/core';

export const ProductDetailsScreen = () => {
  const route = useRoute();
  const { getProductDetails, loading } = useProductDetails({
    sku: route?.params?.sku,
  });

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <View flex center>
      <Text>Product Details</Text>
    </View>
  );
};
