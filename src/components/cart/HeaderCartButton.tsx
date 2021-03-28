/**
 * Created by Dima Portenko on 28.03.2021
 */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableScale } from '../common/TouchableScale';
import * as routes from '../../navigation/routes';

interface HeaderCartButtonProps {
  tintColor?: string;
}

export const HeaderCartButton = ({ tintColor }: HeaderCartButtonProps) => {
  const navigation = useNavigation();

  return (
    <TouchableScale
      onPress={() => {
        navigation.navigate(routes.NAVIGATION_CART_ROUTE);
      }}
      scaleTo={0.92}
    >
      <View paddingH-15>
        <Icon name="cart" color={tintColor} size={22} />
      </View>
    </TouchableScale>
  );
};
