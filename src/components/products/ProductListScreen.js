/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native-markup-kit';
import { useCategoryProducts } from '../../logic/products/useCategoryProducts';
import { useRoute } from '@react-navigation/core';

export const ProductListScreen = () => {
  const route = useRoute();
  const { getCategoryProducts, products, loading } = useCategoryProducts({
    categoryId: route?.params?.categoryId,
  });

  useEffect(() => {
    getCategoryProducts();
  }, []);

  return (
    <View flex center>
      <Text>{`Products count: ${products.length}`}</Text>
    </View>
  );
};
