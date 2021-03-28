/**
 * @flow
 * Created by Dima Portenko on 03.01.2021
 */
import React, { Children, ReactElement, useState } from 'react';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  call,
  cond,
  diff,
  eq,
  greaterThan,
  onChange,
  or,
  useCode,
} from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';
import { mix, translate, useTapGestureHandler, vec, withTransition } from 'react-native-redash';

type RippleButtonProps = {
  children: ReactElement;
  color: string;
  rippleColor: string;
  onPress?: () => void;
  enabled: boolean;
};

const TouchableRipple = ({ children, color, onPress, rippleColor, enabled }: RippleButtonProps) => {
  const [radius, setRadius] = useState(-1);
  const { gestureHandler, position, state } = useTapGestureHandler();
  const child = Children.only(children);
  const progress = withTransition(eq(state, State.BEGAN));
  const isGoingUp = or(greaterThan(diff(progress), 0), eq(progress, 1));
  const scale = mix(progress, 0.001, 1);
  const opacity = isGoingUp;
  const backgroundColor = rippleColor;
  useCode(
    () => [onChange(state, cond(eq(state, State.END), [call([], onPress || (() => null))]))],
    [onPress],
  );
  return (
    <TapGestureHandler {...gestureHandler} enabled={enabled}>
      <Animated.View {...child.props} style={[child.props.style]}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: color,
            overflow: 'hidden',
          }}
          onLayout={({
            nativeEvent: {
              layout: { height, width },
            },
          }) => setRadius(Math.sqrt(width ** 2 + height ** 2))}>
          {radius !== -1 && (
            <Animated.View
              style={{
                opacity,
                backgroundColor,
                borderRadius: radius,
                width: radius * 2,
                height: radius * 2,
                transform: [...translate(vec.create(-radius)), ...translate(position), { scale }],
              }}
            />
          )}
        </View>
        {child.props.children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default TouchableRipple;
