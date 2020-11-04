/**
 * @flow
 * Created by Dima Portenko on 04.11.2020
 */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-markup-kit';
import type { CategoryType } from '../../apollo/queries/getCategory';

type Props = {
  item: CategoryType,
  onPress(item: CategoryType): void,
  color: string,
};

export const CategoryListItem = ({ item, onPress, color }: Props) => {
  const [disabled] = useState(item.children_count < 1);

  return (
    <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
      <View
        center
        height={80}
        backgroundColor={color}
        marginH-15
        marginB-15
        shadow70
        br40>
        <Text text50L>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
