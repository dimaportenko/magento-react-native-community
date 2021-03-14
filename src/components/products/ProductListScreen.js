/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text, Constants, Spacings } from 'react-native-markup-kit';
import { useCategoryProducts } from '../../logic/products/useCategoryProducts';
import { useNavigation, useRoute } from '@react-navigation/core';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { ProductListItem } from './ProductListItem';
import * as routes from '../../navigation/routes';
import type { RenderItemProps } from 'react-native/Libraries/Lists/VirtualizedList';
import type { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';

export const ProductListScreen = (): React$Node => {
  const route = useRoute();
  const navigation = useNavigation();
  const { loading, products, loadMore, refreshing, refresh } = useCategoryProducts({
    categoryId: route?.params?.categoryId,
  });

  const onProductItemPress = (item: ProductType) => {
    navigation.push(routes.NAVIGATION_PRODUCT_DETAILS_ROUTE, {
      title: item.name,
      sku: item.sku,
    });
  };

  const renderItem = ({ item, index }: RenderItemProps<ProductType>) => {
    return <ProductListItem item={item} index={index} onPress={onProductItemPress} />;
  };

  const footerComponent = () => {
    if (loading && products.length !== 0) {
      return (
        <View flex center height={80}>
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
        keyExtractor={item => `productItem${item.id.toString()}`}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        onEndReached={loadMore}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};
