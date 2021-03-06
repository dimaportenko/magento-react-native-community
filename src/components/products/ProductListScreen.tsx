/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import View from 'react-native-ui-lib/view';
import { useCategoryProducts } from '../../logic/products/useCategoryProducts';
import { ProductListItem } from './ProductListItem';
import * as routes from '../../navigation/routes';
import { Spacings } from 'react-native-ui-lib/core';
import { ProductType } from '../../apollo/queries/getCategoryProducts';
import {
  ProductListScreenNavigationProp,
  ProductListScreenRouteProp,
} from '../../navigation/Navigation';

type ProductListScreenProps = {
  route: ProductListScreenRouteProp;
  navigation: ProductListScreenNavigationProp;
};

export const ProductListScreen = ({ route, navigation }: ProductListScreenProps) => {
  const { loading, products, loadMore, refreshing, refresh } = useCategoryProducts({
    categoryId: route?.params?.categoryId,
  });

  const onProductItemPress = (item: ProductType) => {
    navigation.push(routes.NAVIGATION_PRODUCT_DETAILS_ROUTE, {
      title: item.name,
      sku: item.sku,
    });
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ProductType>) => {
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
