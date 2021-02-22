/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React from 'react';
import { View } from 'react-native';
import type { ConfigurableProductOptionsType } from '../../../apollo/queries/getProductDetails';
import type {
  HandleSelectConfigurableOption,
  SelectedConfigurableProductOptions,
} from '../../../logic/products/useProductDetails';
import { Text } from 'react-native-markup-kit';
import { ConfigurableOptionValues } from './ConfigurableOptionValues';

type Props = {
  options: ConfigurableProductOptionsType[],
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions,
  handleSelectConfigurableOption: HandleSelectConfigurableOption,
};

export const ConfigurableProductOptions = ({
  options,
  selectedConfigurableProductOptions,
  handleSelectConfigurableOption,
}: Props) => {

  const renderOption = (option: ConfigurableProductOptionsType) => {
    return (
      <View key={option.attribute_code}>
        <Text text70R>{option.label}</Text>
        <ConfigurableOptionValues
          values={option.values}
          optionCode={option.attribute_code}
          selectedIndex={selectedConfigurableProductOptions[option.attribute_code]}
          handleSelectConfigurableOption={handleSelectConfigurableOption}
        />
      </View>
    );
  };

  return (
    <View>
      {options.map((option) => {
        return renderOption(option);
      })}
    </View>
  );
};
