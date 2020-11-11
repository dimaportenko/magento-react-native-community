/**
 * @flow
 * Created by Dima Portenko on 11.11.2020
 */
import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'react-native-markup-kit';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { TouchableScale } from '../common/TouchableScale';
import { AnimatedAppearance } from '../common/AnimatedAppearance';

type Props = {
  item: ProductType,
  index: number,
};

export const ProductListItem = ({ item, index }: Props) => {
  return (
    <View flex>
      <AnimatedAppearance index={index}>
        <TouchableScale onPress={() => {}} scaleTo={0.97} disabled={false}>
          <View flex center bg-white shadow70 margin-8 br40>
            <View
              style={{ width: '100%', height: 200, overflow: 'hidden' }}
              br40>
              <Image
                source={{ uri: `${item.small_image.url}` }}
                style={{ width: '100%', height: 200 }}
                resizeMode="contain"
              />
            </View>
            <Text center margin-5 text80>
              {item.name}
            </Text>
            <Text
              center
              marginB-8
              text80>{`${item.price_range.minimum_price.final_price.currency} ${item.price_range.minimum_price.final_price.value}`}</Text>
          </View>
        </TouchableScale>
      </AnimatedAppearance>
    </View>
  );
};
