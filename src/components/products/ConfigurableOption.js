/**
 * @flow
 * Created by Dima Portenko on 13.02.2021
 */
import React from 'react';
import { View, Text } from 'react-native-markup-kit';
import type {
  ConfigurableProductOptionType,
  ConfigurableProductOptionValueType,
} from '../../apollo/queries/getProductDetails';

type ConfigurableOptionProps = {
  option: ConfigurableProductOptionType,
};

export const ConfigurableOption = ({ option }: ConfigurableOptionProps) => {
  const renderValueDataByType = (value: ConfigurableProductOptionValueType) => {
    switch (value.swatch_data.__typename) {
      case 'TextSwatchData': {
        return <Text text60R>{value.swatch_data.value}</Text>;
      }
      case 'ColorSwatchData': {
        return <View width={46} height={46} backgroundColor={value.swatch_data.value} />;
      }
      default: {
        return null;
      }
    }
  };

  const renderValue = (value: ConfigurableProductOptionValueType) => {
    return (
      <View width={48} height={48} borderWidth={1} borderColor="black" marginR-10 center>
        {renderValueDataByType(value)}
      </View>
    );
  };

  return (
    <View marginT-10>
      <Text text70>{option.label}</Text>
      <View row marginT-5>
        {option.values.map((value) => renderValue(value))}
      </View>
    </View>
  );
};
