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

const ITEM_HEIGHT = 80;

export const CategoryListItem = ({ item, onPress, color, index }: Props) => {
  const [disabled] = useState(item.children_count < 1);

  const renderText = () => (
    <View flex center>
      <Text text50L>{item.name}</Text>
    </View>
  );

  const renderImage = (isRight: boolean) => {
    const rawUri =
      item.image ?? item?.productPreviewImage?.items?.[0]?.small_image?.url;
    if (!rawUri) {
      return null;
    }
    const uri = `${rawUri ?? ''}?width=300`;
    console.log({ uri });
    return (
      <View style={isRight ? styles.right : styles.left}>
        <Image source={{ uri }} resizeMode="cover" style={styles.image} />
      </View>
    );
  };

  const renderContent = () => {
    const isRight = index % 2 === 0;
    if (isRight) {
      return (
        <>
          {renderText()}
          {renderImage(isRight)}
        </>
      );
    }
    return (
      <>
        {renderImage(isRight)}
        {renderText()}
      </>
    );
  };

  return (
    <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
      <View
        center
        row
        height={ITEM_HEIGHT}
        backgroundColor={color}
        marginH-15
        marginB-15
        shadow70
        br40>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
  },
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
