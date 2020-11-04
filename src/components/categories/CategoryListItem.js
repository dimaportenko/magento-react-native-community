/**
 * @flow
 * Created by Dima Portenko on 03.11.2020
 */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native-markup-kit';
import { TouchableOpacity } from 'react-native';
import type { CategoryType } from '../../apollo/queries/getCategory';
import { useCategoryColors } from '../../logic/categories/useCategoryColors';

type Props = {|
  item: CategoryType,
  onPress(item: CategoryType): void,
  index: number,
  color: string,
|};

export const CategoryListItem = ({ item, onPress, index, color }: Props) => {
  const [disabled, setDisabled] = useState(item.children_count < 1);
  const [backgroundColor, setBackgroundColor] = useState({});

  useEffect(() => {
    setBackgroundColor({
      backgroundColor: color,
    });
  }, [color]);

  return (
    <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
      <View
        center
        height={80}
        marginH-15
        marginB-15
        shadow70
        backgroundColor={color}
        br50>
        <Text text50L>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
