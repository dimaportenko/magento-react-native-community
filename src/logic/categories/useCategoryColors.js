/**
 * @flow
 * Created by Dima Portenko on 03.11.2020
 */
import React, { useState, useEffect } from 'react';
import { shuffledColors } from '../../theme/colors';

type Props = {||};

type Result = {|
  colorForIndex(index: number): string,
|};

export const useCategoryColors = (): Result => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(shuffledColors())
  }, [])

  const colorForIndex = (index: number) => {
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  return {
    colorForIndex,
  };
};
