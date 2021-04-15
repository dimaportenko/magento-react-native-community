/**
 * Created by Dima Portenko on 02.04.2021
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useCartDetails } from '../../logic/cart/useCartDetails';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import { CartDetailItemType } from '../../apollo/queries/cartItemsFragment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableScale } from '../common/TouchableScale';

interface CartDetailsScreenProps {}

export const CartDetailsScreen = (props: CartDetailsScreenProps) => {
  const { width } = useWindowDimensions();
  const { getCartDetails, loading, cartItems, totals } = useCartDetails();
  const insets = useSafeAreaInsets();

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

  const onItemPress = (item: CartDetailItemType) => {};

  const renderItem: ListRenderItem<CartDetailItemType> = ({ item }) => {
    return (
      <View row marginH-15 paddingV-10>
        <View bg-white br30 padding-5 style={{ overflow: 'hidden' }}>
          <Image
            source={{ uri: item.product.image.url }}
            resizeMode="contain"
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
            }}
          />
        </View>
        <View spread paddingL-10 paddingV-5 style={{ maxWidth: width - 90 - 50 - 30 }}>
          <Text numberOfLines={2}>{item.product.name}</Text>
          <Text>{`${item.prices.price.value} ${item.prices.price.currency}`}</Text>
          <Text>{`qty: ${item.quantity}`}</Text>
        </View>
        <View flex />
        <View center>
          <TouchableScale onPress={() => onItemPress(item)} scaleTo={0.93}>
            <View paddingH-15>
              <Icon name="trash" color="black" size={20} />
            </View>
          </TouchableScale>
        </View>
      </View>
    );
  };

  return (
    <View flex>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.product.sku}
        ItemSeparatorComponent={() => (
          <View height={1} backgroundColor="rgba(0, 0, 0, 0.1)" marginH-15 />
        )}
      />
      <View width="100%" bg-white padding-15 right style={{ paddingBottom: insets.bottom }}>
        <Text>{`Totals: ${totals?.grand_total.value} ${totals?.grand_total.currency}`}</Text>
      </View>
    </View>
  );
};
