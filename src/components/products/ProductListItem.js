/**
 * @flow
 * Created by Dima Portenko on 11.11.2020
 */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text, Constants, Spacings } from 'react-native-markup-kit';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { TouchableScale } from '../common/TouchableScale';
import { AnimatedAppearance } from '../common/AnimatedAppearance';
import { priceStringFromPriceRange } from '../../logic/util/price';

type Props = {
  item: ProductType,
  index: number,
  onPress(item: ProductType): void,
};

const COLUMN_SIZE = Constants.screenWidth / 2 - Spacings.s2 * 3;

export const ProductListItem = ({ item, index, onPress }: Props): React$Node => {
  return (
    <AnimatedAppearance index={index}>
      <TouchableScale
        onPress={() => {
          onPress(item);
        }}
        scaleTo={0.97}
        disabled={false}>
        <View flex bg-white br40 margin-s2 shadow70 style={{ width: COLUMN_SIZE }}>
          <View style={[styles.image, styles.imageWrap]} br40>
            <Image source={{ uri: item.small_image.url }} style={styles.image} />
          </View>
          <Text center margin-5>
            {item.name}
          </Text>
          <Text center marginB-5>
            {priceStringFromPriceRange(item.price_range)}
          </Text>
        </View>
      </TouchableScale>
    </AnimatedAppearance>
  );
};

const styles = StyleSheet.create({
  image: {
    width: COLUMN_SIZE,
    height: (COLUMN_SIZE / 3) * 4,
  },
  imageWrap: {
    overflow: 'hidden',
  },
});
