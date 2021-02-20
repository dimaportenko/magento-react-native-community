/**
 * @flow
 * Created by Dima Portenko on 16.02.2021
 */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-markup-kit';
import type { ConfigurableProductOptionValueType } from '../../../apollo/queries/getProductDetails';
import { TouchableScale } from '../../common/TouchableScale';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  values: ConfigurableProductOptionValueType[],
};

export const ConfigurableOptionValues = ({ values }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const renderValue = (value: ConfigurableProductOptionValueType) => {
    const selected = value.value_index === selectedIndex;
    switch (value.swatch_data.__typename) {
      case 'ColorSwatchData': {
        return (
          <>
            <View style={{ width: 46, height: 46, backgroundColor: value.swatch_data.value }} />
            {selected ? (
              <View style={styles.colorSelected}>
                <Icon name="checkmark" color="black" size={24} />
              </View>
            ) : null}
          </>
        );
      }
      case 'TextSwatchData': {
        return (
          <View
            style={[styles.textSelected, { backgroundColor: selected ? 'black' : 'transparent' }]}>
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
      {values.map((value) => (
        <TouchableScale onPress={() => setSelectedIndex(value.value_index)}>
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
  colorSelected: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSelected: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
