/**
 * @flow
 * Created by Dima Portenko on 27.11.2020
 */
import React, { useState } from 'react';
import { FlatList, Image } from 'react-native';
import { View, Constants, Text } from 'react-native-markup-kit';
import type { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';

type Props = {
  items: Array<MediaGalleryItemType>,
};

export const MediaGallery = ({ items }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const renderItem = ({ item, index }: { item: MediaGalleryItemType, index: number }) => {
    return (
      <View bg-white>
        <Image
          source={{ uri: item.url }}
          style={{
            width: Constants.screenWidth,
            height: Constants.screenWidth,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const onMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;

    const currentNumber = Math.floor(contentOffset / width) + 1;
    setCurrentPage(currentNumber);
  };

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `MediaGallery${index}`}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <View abs right paddingH-10 paddingV-5 margin-5 bg-grey30 br60>
        <Text white>{`${currentPage} / ${items.length}`}</Text>
      </View>
    </View>
  );
};
