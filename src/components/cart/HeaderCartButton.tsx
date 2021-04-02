/**
 * Created by Dima Portenko on 02.04.2021
 */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableScale } from '../common/TouchableScale';
import * as routes from '../../navigation/routes';

interface HeaderCartButtonProps {

}

export const HeaderCartButton = (props: HeaderCartButtonProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(routes.NAVIGATION_CART_DETAILS_ROUTE);
  };

  return (
    <TouchableScale onPress={onPress} scaleTo={0.93}>
      <View paddingH-15>
        <Icon name="cart" color="black" size={20} />
      </View>
    </TouchableScale>
  );
};
