/**
 * Created by Dima Portenko on 04.05.2021
 */
import React from 'react';
import { AnimatedAppearance } from '../common/AnimatedAppearance';
import { Text, View } from 'react-native-ui-lib';
import { ActivityIndicator, Image } from 'react-native';
import { getPriceString } from '../../logic/util/price';
import { TouchableScale } from '../common/TouchableScale';
import Icon from 'react-native-vector-icons/EvilIcons';
import { CartDetailItemType } from '../../apollo/queries/cartItemsFragment';

interface CartDetailsListItemProps {
  index: number;
  isLast: boolean;
  removing: boolean;
  item: CartDetailItemType;
  onRemoveCartItemPress: (item: CartDetailItemType) => void;
}

export const CartDetailsListItem = ({ index, isLast, item, onRemoveCartItemPress, removing }: CartDetailsListItemProps) => {

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
                {removing ? (
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
