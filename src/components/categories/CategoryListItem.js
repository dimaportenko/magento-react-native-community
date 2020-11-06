/**
 * @flow
 * Created by Dima Portenko on 04.11.2020
 */
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Text, View } from 'react-native-markup-kit';
import type { CategoryType } from '../../apollo/queries/getCategory';

type Props = {
  item: CategoryType,
  onPress(item: CategoryType): void,
  color: string,
  index: number,
};

const ITEM_HEIGHT = 80;
const timingConfig = { duration: 50, easing: Easing.linear };

export const CategoryListItem = ({ item, onPress, color, index }: Props) => {
  const [disabled] = useState(item.children_count < 1);
  const pressed = useSharedValue(false);
  const shown = useSharedValue(false);
  const progress = useDerivedValue(() =>
    pressed.value ? withTiming(1, timingConfig) : withTiming(0, timingConfig),
  );

  const appearance = useDerivedValue(() => (shown.value ? withSpring(1) : 0));

  useEffect(() => {
    shown.value = true;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 0.97],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      appearance.value,
      [0, 1],
      [50, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      appearance.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ scale }, { translateY }],
      opacity: Platform.select({ ios: opacity }),
    };
  });

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
    <TouchableWithoutFeedback
      disabled={disabled}
      onPressIn={() => {
        pressed.value = true;
      }}
      onPressOut={() => {
        pressed.value = false;
      }}
      onPress={() => onPress(item)}>
      <Animated.View style={animatedStyle}>
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
      </Animated.View>
    </TouchableWithoutFeedback>
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
