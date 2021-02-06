/**
 * @flow
 * Created by Dima Portenko on 06.02.2021
 */
import React from 'react';
import { View } from 'react-native-markup-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableScale } from '../common/TouchableScale';

export const HeaderCartButton = () => {
  return (
    <TouchableScale onPress={() => {}} scaleTo={0.9} disabled={false}>
      <View br60 padding-10 marginR-5>
        <Icon name="cart" color="black" size={24} height={50} />
      </View>
    </TouchableScale>
  );
};
