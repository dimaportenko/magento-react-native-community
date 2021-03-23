/**
 * @flow
 * Created by Dima Portenko on 27.11.2020
 */
import React, { ReactNode, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions
} from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';

type Props = {
  items: Array<MediaGalleryItemType>;
};

export const MediaGallery = ({ items }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { width: screenWidth } = useWindowDimensions();

  const renderItem = ({ item, index }: ListRenderItemInfo<MediaGalleryItemType>) => {
    return (
      <View bg-white>
        <Image
          source={{ uri: item.url }}
          style={{
            width: screenWidth,
            height: screenWidth,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
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
      <View
        style={{
          position: 'absolute',
          right: 10,
          top: 5,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        bg-grey30
        br60>
        <Text white>{`${currentPage} / ${items?.length}`}</Text>
      </View>
    </View>
  );
};
