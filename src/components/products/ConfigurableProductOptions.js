/**
 * @flow
 * Created by Dima Portenko on 13.02.2021
 */
import React from 'react';
import { View } from 'react-native';
import type { ConfigurableProductOptionType } from '../../apollo/queries/getProductDetails';
import { ConfigurableOption } from './ConfigurableOption';

type ConfigurableProductOptionsProps = {
  options: ConfigurableProductOptionType[],
};

export const ConfigurableProductOptions = ({ options }: ConfigurableProductOptionsProps) => {
  return (
    <View>
      {options.map((option) => (
        <ConfigurableOption key={option.attribute_code} option={option} />
      ))}
    </View>
  );
};
