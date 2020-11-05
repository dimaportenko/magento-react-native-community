/**
 * @flow
 * Created by Dima Portenko on 04.11.2020
 */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-markup-kit';
import type { CategoryType } from '../../apollo/queries/getCategory';

type Props = {
  item: CategoryType,
  onPress(item: CategoryType): void,
  color: string,
  index: number,
};

export const CategoryListItem = ({ item, onPress, color, index }: Props) => {
  const [disabled] = useState(item.children_count < 1);

  const renderTitle = () => (
    <View center flex>
      <Text text50L>{item.name}</Text>
    </View>
  );

  const renderContent = () => {
    const imageRaw =
      item.image ?? item.productImagePreview?.items?.[0]?.small_image?.url;
    const image = `${imageRaw}?width=240`;
    if (index % 2 === 0) {
      return (
        <>
          {renderTitle()}
          {image && (
            <View style={styles.right}>
              <Image
                source={{ uri: image }}
                style={{ width: 80, height: 80 }}
                resizeMode="cover"
              />
            </View>
          )}
        </>
      );
    }

    return (
      <>
        {image && (
          <View style={styles.left}>
            <Image
              source={{ uri: image }}
              style={{ width: 80, height: 80 }}
              resizeMode="cover"
            />
          </View>
        )}
        {renderTitle()}
      </>
    );
  };

  return (
    <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
      <View
        height={80}
        backgroundColor={color}
        marginH-15
        marginB-15
        shadow70
        row
        br40>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  left: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
  },
  right: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
});
