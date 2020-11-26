/**
 * @flow
 * Created by Dima Portenko on 26.11.2020
 */
import React, { useState } from 'react';
import { FlatList, Image } from 'react-native';
import { View, Constants, Text } from 'react-native-markup-kit';
import type { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';

type Props = {|
  items: Array<MediaGalleryItemType>,
|};

export const MediaGallery = ({ items }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width) + 1;
    setCurrentPage(pageNum);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: MediaGalleryItemType,
    index: number,
  }) => {
    return (
      <View bg-white>
        <Image
          source={{ url: item.url }}
          style={{
            width: Constants.screenWidth,
            height: Constants.screenWidth,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item, index) => `media_gallery_${index}`}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}
      />
      <View absR paddingH-10 paddingV-5 margin-5 br60 bg-grey30>
        <Text white>{`${currentPage} / ${items.length}`}</Text>
      </View>
    </View>
  );
};
