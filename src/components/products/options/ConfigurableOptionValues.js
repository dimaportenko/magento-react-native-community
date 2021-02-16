/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-markup-kit';
import type { ConfigurableProductOptionValueType } from '../../../apollo/queries/getProductDetails';

type Props = {
  values: ConfigurableProductOptionValueType[],
};

export const ConfigurableOptionValues = ({ values }: Props) => {
  const renderValue = (value: ConfigurableProductOptionValueType) => {
    switch (value.swatch_data.__typename) {
      case 'ColorSwatchData': {
        return <View style={{ width: 46, height: 46, backgroundColor: value.swatch_data.value }} />;
      }
      case 'TextSwatchData': {
        return <Text text60R>{value.swatch_data.value}</Text>;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <View row marginV-10>
      {values.map((value) => (
        <View style={styles.values}>{renderValue(value)}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  values: {
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
});
