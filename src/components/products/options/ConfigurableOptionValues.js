/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-markup-kit';
import type { ConfigurableProductOptionValueType } from '../../../apollo/queries/getProductDetails';
import { TouchableScale } from '../../common/TouchableScale';
import Icon from 'react-native-vector-icons/Ionicons';
import type { HandleSelectConfigurableOption } from '../../../logic/products/useProductDetails';

type Props = {
  values: ConfigurableProductOptionValueType[],
  optionCode: string,
  selectedIndex: number,
  handleSelectConfigurableOption: HandleSelectConfigurableOption,
};

export const ConfigurableOptionValues = ({
  values,
  selectedIndex,
  handleSelectConfigurableOption,
  optionCode,
}: Props): React$Node => {
  const renderValue = (value: ConfigurableProductOptionValueType) => {
    const selected = selectedIndex === value.value_index;
    switch (value.swatch_data.__typename) {
      case 'ColorSwatchData': {
        return (
          <>
            <View style={{ width: 46, height: 46, backgroundColor: value.swatch_data.value }} />
            {selected ? (
              <View style={styles.selectedColor}>
                <Icon name="checkmark" color="black" size={24} />
              </View>
            ) : null}
          </>
        );
      }
      case 'TextSwatchData': {
        return (
          <View
            style={[styles.selectedText, { backgroundColor: selected ? 'black' : 'transparent' }]}>
            <Text text60R color={selected ? 'white' : 'black'}>
              {value.swatch_data.value}
            </Text>
          </View>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <View row marginV-10>
      {values.map(value => (
        <TouchableScale
          key={`${optionCode}${value.value_index}`}
          onPress={() => handleSelectConfigurableOption(optionCode, value.value_index)}>
          <View style={styles.values}>{renderValue(value)}</View>
        </TouchableScale>
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
  selectedColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
