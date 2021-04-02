/**
 * Created by Dima Portenko on 28.03.2021
 */
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useCartDetails } from '../../logic/cart/useCartDetails';
import { CartDetailsItemType } from '../../apollo/queries/getCartDetails';
import { CartDetailsListItem } from './CartDetailsListItem';

interface CartScreenProps {}

export const CartScreen = (props: CartScreenProps) => {
  const { getCartDetails, loading, cartDetails, error } = useCartDetails();

  useEffect(() => {
    getCartDetails();
  }, []);

  useEffect(() => {
    console.log(cartDetails);
  }, [cartDetails]);

  if (error) {
    return (
      <View flex center>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<CartDetailsItemType>) => {
    return (
      <CartDetailsListItem item={item} index={index} />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex>
        <FlatList
          data={cartDetails?.cart.items}
          keyExtractor={item => `productItem${item.product.sku}`}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={getCartDetails} />}
        />
        <View absB>
          <Text>Totals - {cartDetails?.cart.total_quantity}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
