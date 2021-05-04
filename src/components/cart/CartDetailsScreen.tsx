/**
 * Created by Dima Portenko on 02.04.2021
 */
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useCartDetails } from '../../logic/cart/useCartDetails';
import { ActivityIndicator, FlatList, Image, ListRenderItem, RefreshControl } from 'react-native';
import { CartDetailItemType } from '../../apollo/queries/cartItemsFragment';
import { TouchableScale } from '../common/TouchableScale';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedAppearance } from '../common/AnimatedAppearance';
import { getPriceString } from '../../logic/util/price';

interface CartDetailsScreenProps {}

export const CartDetailsScreen = (props: CartDetailsScreenProps) => {
  const [removeItemUid, setRemoveItemUid] = useState('');
  const {
    getCartDetails,
    loading,
    cartItems,
    totals,
    removeFromCart,
    removeItemLoading,
  } = useCartDetails();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getCartDetails();
  }, []);

  const onRemoveCartItemPress = (item: CartDetailItemType) => {
    setRemoveItemUid(item.uid);
    removeFromCart(item.uid);
  };

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
              <Text>{getPriceString(item.prices.price)}</Text>
              <Text>{`qty: ${item.quantity}`}</Text>
            </View>

            <View center>
              <TouchableScale onPress={() => onRemoveCartItemPress(item)} scaleTo={0.93}>
                <View paddingH-15>
                  {removeItemLoading && removeItemUid === item.uid ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <Icon name="trash" color="black" size={32} />
                  )}
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
        refreshControl={<RefreshControl refreshing={loading} onRefresh={getCartDetails} />}
      />
      {!!totals && (
        <View bg-white style={{ paddingBottom: insets.bottom }}>
          <Text
            text70R
            margin-10>{`Totals: ${getPriceString(totals?.grand_total)}`}</Text>
        </View>
      )}
    </View>
  );
};
