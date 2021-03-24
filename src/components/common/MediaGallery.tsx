/**
 * @flow
 * Created by Dima Portenko on 27.11.2020
 */
import React, { useState } from 'react';
import { FlatList, Image } from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import type { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';
import type { RenderItemProps } from 'react-native/Libraries/Lists/VirtualizedList';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

type Props = {
  items: Array<MediaGalleryItemType>,
};

export const MediaGallery = ({ items }: Props): React$Node => {
  const [currentPage, setCurrentPage] = useState(1);
  const { width: screenWidth } = useWindowDimensions();

  const renderItem = ({ item, index }: RenderItemProps<MediaGalleryItemType>) => {
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

  const onMomentumScrollEnd = event => {
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
