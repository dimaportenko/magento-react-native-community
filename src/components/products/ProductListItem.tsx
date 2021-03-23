/**
 * @flow
 * Created by Dima Portenko on 11.11.2020
 */
import React, { ReactNode } from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Spacings } from 'react-native-ui-lib/core';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { TouchableScale } from '../common/TouchableScale';
import { AnimatedAppearance } from '../common/AnimatedAppearance';
import { priceStringFromPriceRange } from '../../logic/util/price';
import { Shadows } from '../../theme/shadows';

type Props = {
  item: ProductType;
  index: number;
  onPress(item: ProductType): void;
};

export const ProductListItem = ({ item, index, onPress }: Props) => {
  const { width: screenWidth } = useWindowDimensions();
  const COLUMN_SIZE = screenWidth / 2 - Spacings.s2 * 3;

  return (
    <AnimatedAppearance index={index}>
      <TouchableScale
        onPress={() => {
          onPress(item);
        }}
        scaleTo={0.97}
        disabled={false}>
        <View flex bg-white br40 margin-s2 style={{ width: COLUMN_SIZE, ...Shadows.shadow70 }}>
          <View
            style={[
              {
                width: COLUMN_SIZE,
                height: (COLUMN_SIZE / 3) * 4,
              },
              styles.imageWrap,
            ]}
            br40>
            <Image
              source={{ uri: item.small_image.url }}
              style={{
                width: COLUMN_SIZE,
                height: (COLUMN_SIZE / 3) * 4,
              }}
            />
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
  imageWrap: {
    overflow: 'hidden',
  },
});
