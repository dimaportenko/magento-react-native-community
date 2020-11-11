/**
 * @flow
 * Created by Dima Portenko on 06.11.2020
 */
import React, { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
  Easing,
  interpolate,
  Extrapolate,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: React$Node,
  index?: number,
};

export const AnimatedAppearance = ({ children, index }: Props) => {
  const play = useSharedValue(false);
  const progress = useDerivedValue(() => {
    return play.value
      ? withDelay(50 * (index ?? 0), withTiming(1, { duration: 350 }))
      : 0;
  });

  useEffect(() => {
    play.value = true;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);

    const translateY = interpolate(progress.value, [0, 1], [100, 0]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
