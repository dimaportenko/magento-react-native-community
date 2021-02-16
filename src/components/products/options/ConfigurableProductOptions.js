/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React from 'react';
import { View } from 'react-native';
import type { ConfigurableProductOptionsType } from '../../../apollo/queries/getProductDetails';
import { ConfigurableOption } from './ConfigurableOption';

type Props = {
  options: ConfigurableProductOptionsType[],
};

export const ConfigurableProductOptions = ({ options }: Props) => {
  return (
    <View>
      {options.map((option) => {
        return <ConfigurableOption option={option} />;
      })}
    </View>
  );
};
