/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React from 'react';
import { View } from 'react-native';
import type { ConfigurableProductOptionsType } from '../../../apollo/queries/getProductDetails';
import type {
  HandleConfigurableOptionsSelectType,
  SelectedConfigurableOptionsType,
} from '../../../logic/products/useProductDetails';
import { Text } from 'react-native-markup-kit';
import { ConfigurableOptionValues } from './ConfigurableOptionValues';

type Props = {
  options: ConfigurableProductOptionsType[],
  handleConfigurableOptionsSelect: HandleConfigurableOptionsSelectType,
  selectedConfigurableOptions: SelectedConfigurableOptionsType,
};

export const ConfigurableProductOptions = ({
  options,
  selectedConfigurableOptions,
  handleConfigurableOptionsSelect,
}: Props) => {
  const renderOption = (option: ConfigurableProductOptionsType) => {
    return (
      <View key={option.attribute_code}>
        <Text text70R>{option.label}</Text>
        <ConfigurableOptionValues
          values={option.values}
          handleConfigurableOptionsSelect={handleConfigurableOptionsSelect}
          selectedIndex={selectedConfigurableOptions[option.attribute_code]}
          optionCode={option.attribute_code}
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
