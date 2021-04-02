/**
 * Created by Dima Portenko on 31.03.2021
 */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { CartDetailsItemType } from '../../apollo/queries/getCartDetails';
import { Text, View } from 'react-native-ui-lib';
import { AnimatedAppearance } from '../common/AnimatedAppearance';

interface CartDetailsListItemProps {
  item: CartDetailsItemType;
  index: number;
}

const ITEM_HEIGHT = 100;

export const CartDetailsListItem = ({ item, index }: CartDetailsListItemProps) => {
  return (
    <AnimatedAppearance>
      <View row>
        <Image
          source={{ uri: item.product.small_image.url }}
          resizeMode="contain"
          style={styles.image}
        />
        <View>
          <Text>{item.product.name}</Text>
          <Text>{item.product.sku}</Text>
        </View>
      </View>
    </AnimatedAppearance>
  );
};

const styles = StyleSheet.create({
  image: {
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
  },
});
