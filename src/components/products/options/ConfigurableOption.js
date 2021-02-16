/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React from 'react';
import { View, Text } from 'react-native-markup-kit';
import type { ConfigurableProductOptionsType } from '../../../apollo/queries/getProductDetails';
import { ConfigurableOptionValues } from './ConfigurableOptionValues';

type Props = {
  option: ConfigurableProductOptionsType,
};

export const ConfigurableOption = ({ option }: Props) => {

  return (
    <View>
      <Text text70R>{option.label}</Text>
      <ConfigurableOptionValues values={option.values} />
    </View>
  );
};
