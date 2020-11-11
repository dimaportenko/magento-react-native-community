/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { View, Text, Constants, Spacings } from 'react-native-markup-kit';
import { useCategoryProducts } from '../../logic/products/useCategoryProducts';
import { useRoute } from '@react-navigation/core';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { ProductListItem } from './ProductListItem';

export const ProductListScreen = () => {
  const route = useRoute();
  const { getCategoryProducts, loading, products } = useCategoryProducts({
    categoryId: route?.params?.categoryId,
  });

  useEffect(() => {
    getCategoryProducts();
  }, []);

  if (loading) {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductType,
    index: number,
  }) => {
    return <ProductListItem item={item} index={index} />;
  };

  return (
    <View flex>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          paddingVertical: Spacings.s2,
          marginHorizontal: Spacings.s2,
        }}
        data={products}
        keyExtractor={(item) => `productItem${item.id.toString()}`}
        renderItem={renderItem}
      />
    </View>
  );
};
