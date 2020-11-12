/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Spacings, Text } from 'react-native-markup-kit';
import { useCategoryProducts } from '../../logic/products/useCategoryProducts';
import { useRoute } from '@react-navigation/core';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { ProductListItem } from './ProductListItem';

export const ProductListScreen = () => {
  const route = useRoute();
  const {
    refresh,
    refreshing,
    loadMore,
    loading,
    products,
  } = useCategoryProducts({
    categoryId: route?.params?.categoryId,
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductType,
    index: number,
  }) => {
    return <ProductListItem item={item} index={index} />;
  };

  const renderFooter = () => {
    if (loading && products.length > 0) {
      return (
        <View center height={80}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
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
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
      <View absB>
        <Text center>{products.length}</Text>
      </View>
    </View>
  );
};
