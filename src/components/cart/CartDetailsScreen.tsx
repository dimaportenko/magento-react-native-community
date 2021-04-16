/**
 * Created by Dima Portenko on 02.04.2021
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useCartDetails } from '../../logic/cart/useCartDetails';
import { ActivityIndicator, FlatList, Image, ListRenderItem } from 'react-native';
import { CartDetailItemType } from '../../apollo/queries/cartItemsFragment';
import { TouchableScale } from '../common/TouchableScale';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedAppearance } from '../common/AnimatedAppearance';

interface CartDetailsScreenProps {}

export const CartDetailsScreen = (props: CartDetailsScreenProps) => {
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

  const onCartItemPress = () => {};

  const renderCartItem: ListRenderItem<CartDetailItemType> = ({ item, index }) => {
    const isLast = cartItems.length - 1 === index;
    return (
      <AnimatedAppearance index={index}>
        <View marginH-15>
          <View row paddingV-10>
            <View bg-white br30>
              <Image
                source={{ uri: item.product.image.url }}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>

            <View paddingH-10 paddingV-5 spread flex>
              <Text>{item.product.name}</Text>
              <Text>{`${item.prices.price.value} ${item.prices.price.currency}`}</Text>
              <Text>{`qty: ${item.quantity}`}</Text>
            </View>

            <View center>
              <TouchableScale onPress={onCartItemPress} scaleTo={0.93}>
                <View paddingH-15>
                  <Icon name="trash" color="black" size={20} />
                </View>
              </TouchableScale>
            </View>
          </View>
          {!isLast && (
            <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', height: 1, width: '100%' }} />
          )}
        </View>
      </AnimatedAppearance>
    );
  };

  return (
    <View flex>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.product.sku}
        showsVerticalScrollIndicator={false}
      />
      {!!totals && (
        <View bg-white style={{ paddingBottom: insets.bottom }}>
          <Text
            text70R
            margin-10>{`Totals: ${totals?.grand_total.value} ${totals?.grand_total.currency}`}</Text>
        </View>
      )}
    </View>
  );
};
